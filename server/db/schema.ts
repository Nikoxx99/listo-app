import { InferSelectModel } from "drizzle-orm";
import { mysqlTable, uniqueIndex, varchar, serial } from 'drizzle-orm/mysql-core';

//write a user schema ready to implement own auth with salt&pepper
export const users = mysqlTable('users', {
  id: serial("id").primaryKey(),
  username: varchar('username', { length: 256 }),
  email: varchar('email', { length: 256 }),
  passHash: varchar('passHash', { length: 256 }),
  passSalt: varchar('passSalt', { length: 256 }),
}, (users) => ({
  usernameIndex: uniqueIndex('username_idx').on(users.username),
}));

export type User = InferSelectModel<typeof users>;
export type InsertUser = InferSelectModel<typeof users>;

