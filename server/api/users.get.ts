import { users } from "../db/schema";
import { db } from "../mysql-service";

export default defineEventHandler(async () => {
  try {
    const usersResp = await db.select().from(users);
    return { "users" : usersResp}
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    });
  }
});