import { drizzle } from "drizzle-orm/mysql2";
import dbInfo from "~/drizzle.config";
import mysql from "mysql2/promise";
const config = useRuntimeConfig()
const poolConnection = mysql.createPool(dbInfo.dbCredentials);
export const db = drizzle(poolConnection);