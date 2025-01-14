import { Config } from "drizzle-kit";

// https://orm.drizzle.team/docs/drizzle-config-file#dbcredentials
export default {
  dialect: "sqlite",
  schema: "./src/db/schema.ts",
  out: "./migrations",
  driver: "d1-http",
  dbCredentials: {
    accountId: "${ACCOUNT_ID}",
    databaseId: "${DATABASE_ID}",
    token: "${API_TOKEN}",
  },
} satisfies Config;
