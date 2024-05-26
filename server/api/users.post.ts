import { users, InsertUser } from "../db/schema";
import { db } from "../mysql-service";
import bcrypt from 'bcryptjs'
const config = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { salt, hash } = await hashPassword(body.password);
    const newUser: InsertUser = {
      ...body,
      passHash: hash,
      passSalt: salt,
    }
    const result = await db.insert(users).values(newUser);
    return { newUser : result}
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    });
  }
});

const saltRounds = 10;
const PEPPER = config.pepper

async function hashPassword(password) {
    const salt = await bcrypt.genSalt(saltRounds);
    const passwordWithPepper = password + PEPPER;
    console.log(passwordWithPepper)
    const hash = await bcrypt.hash(passwordWithPepper, salt);
    return { salt, hash };
}