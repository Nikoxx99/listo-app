import { users } from "../db/schema";
import { db } from "../mysql-service";
import { eq } from "drizzle-orm";
import jwt from 'jsonwebtoken'
import Cookies from 'js-cookie'
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
    if (typeof usersResp === 'object' && usersResp.user && usersResp.user.length > 0) {
      const valid = await verifyPassword(usersResp.passHash, usersResp.passSalt, usersResp.value, pepper)
      if (valid) {
        const user = { username: body.username };
        const token = generateToken(user);

        Cookies.set('geoloc_code', token, { expires: 7 });
        return { user: user }
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

const saltRounds = 10;
const PEPPER = config.pepper

async function verifyPassword(storedHash, storedSalt, enteredPassword, pepper1) {
  try {
    const enteredPasswordWithPepper = enteredPassword + pepper1;
    console.log(enteredPasswordWithPepper)
    return await bcrypt.compare(enteredPasswordWithPepper, storedHash);
  } catch (error) {
      errorHashVersion.value = true
      return false
  }
}

const secret = config.jwt_secret

function generateToken(user) {
    return jwt.sign(user, secret, { expiresIn: '72h' }); // Ajusta el tiempo de expiración según tus necesidades
}