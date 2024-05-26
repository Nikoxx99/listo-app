import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'mysql',
  schema: './server/db/schema.ts',
  out: './server/db/migrations',
  dbCredentials: {
    host: 'localhost',
    user: 'root',
    database: 'listo-app',
    password: process.env.DB_PASSWORD,
  }
})