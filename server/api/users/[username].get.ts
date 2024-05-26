import { users } from "../../db/schema";
import { db } from "../../mysql-service";
import { eq } from "drizzle-orm";
export default defineEventHandler(async (event) => {
  try {
    // get id as function parameter from route params
    const username = event.context.params?.username as string;
    const usersResp = await db
      .select()
      .from(users)
      .where(eq(users.username, username))
    return { user: usersResp };
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    });
  }
});
