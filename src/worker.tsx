import { defineApp } from "rwsdk/worker";
import { index, render, route } from "rwsdk/router";
import { Document } from "@/app/Document";
import { Home } from "src/pages/Home";
import { setCommonHeaders } from "src/headers";
import { drizzle } from "drizzle-orm/d1";
import { auth } from "./lib/auth";
import { db } from "./db/db";

export interface Env {
  DB: D1Database;
}

export type AppContext = {
  db: ReturnType<typeof drizzle>;
};

export default defineApp([
  setCommonHeaders(),
  async ({ ctx, request, headers }) => {
    // setup db
    ctx.db = db;
  },
  route("/api/auth/*", ({ request, ctx }) => auth(ctx.db).handler(request)),
  render(Document, [index([Home])]),
]);
