import { users } from "../db/schema";
import { db } from "../mysql-service";
import { eq } from "drizzle-orm";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
const config = useRuntimeConfig()
const pepper = config.pepper

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const usersResp = await db
    .select()
    .from(users)
    .where(eq(users.username, body.username))
    console.log(usersResp)
    if (Array.isArray(usersResp) && usersResp[0].username) {
      const valid = await verifyPassword(usersResp, body.password, pepper)
      console.log(valid)
      if (valid) {
        const user = { username: body.username };
        const token = generateToken(user);
        return { user: user, token: token}
      } else {
        return {"error" : "User not found or password is incorrect."}
      }
    } else {
      return {"error" : "User not found or password is incorrect."}
    }

  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    });
  }
});

async function verifyPassword(storedHash: Array<{ passHash: string | null }>, enteredPassword: string, pepper1: string) {
  try {
    const enteredPasswordWithPepper = enteredPassword + pepper1; 
    return await bcrypt.compare(enteredPasswordWithPepper, storedHash[0]?.passHash || '');
  } catch (error) {
    return false;
  }
}
const secret = config.jwt_secret

function generateToken(user: string | object) {
    return jwt.sign(user, secret, { expiresIn: '7d' }); // Ajusta el tiempo de expiración según tus necesidades
}