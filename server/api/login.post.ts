import { users } from "../db/schema";
import { db } from "../mysql-service";
import { eq } from "drizzle-orm";
import * as jose from 'jose'
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
    if (Array.isArray(usersResp) && usersResp[0].username) {
      const valid = await verifyPassword(usersResp, body.password, pepper)
      if (valid) {
        const token = await generateToken();
        return { token: token}
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
const secret = new TextEncoder().encode(
  config.jwt_secret,
)
const alg = 'HS256'

async function generateToken() {
  const jwt = await new jose.SignJWT({ 'master:listoapp:sign': true })
  .setProtectedHeader({ alg })
  .setIssuedAt()
  .setIssuer('master:listoapp')
  .setAudience('listoapp:users')
  .setExpirationTime('7d')
  .sign(secret)
  return jwt
}