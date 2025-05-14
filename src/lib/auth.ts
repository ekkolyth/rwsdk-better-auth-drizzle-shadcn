import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import type { drizzle } from "drizzle-orm/d1";

export const auth = (db: ReturnType<typeof drizzle>) =>
  betterAuth({
    database: drizzleAdapter(db, {
      provider: "sqlite", // or "mysql", "sqlite"
    }),
    emailAndPassword: {
      enabled: true,
    },
  });
