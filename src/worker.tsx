import { defineApp } from "rwsdk/worker";
import { prefix, render, route } from "rwsdk/router";
import { Document } from "@/app/Document";
import { Home } from "@/app/pages/Home";
import { setCommonHeaders } from "src/headers";
import { auth } from "./lib/auth";
import { User } from "./db/schema/auth-schema";
import { userRoutes } from "./app/pages/user/routes";

export interface Env {
  DB: D1Database;
}

export type AppContext = {
  user: User | undefined;
};

export default defineApp([
  setCommonHeaders(),
  async ({ ctx, request }) => {
    try {
      const session = await auth.api.getSession({
        headers: request.headers,
      });

      if (session?.user) {
        ctx.user = {
          ...session.user,
          image: session.user.image ?? null,
        };
      }
    } catch (error) {
      console.error("Session error:", error);
    }
  },
  route("/api/auth/*", ({ request }) => {
    console.log("heloooooo", request);
    return auth.handler(request);
  }),
  render(Document, [
    route("/", () => new Response("Hello, World!")),
    route("/home", [
      ({ ctx }) => {
        if (!ctx.user) {
          return new Response(null, {
            status: 302,
            headers: { Location: "/user/login" },
          });
        }
      },
      Home,
    ]),
    prefix("/user", userRoutes),
  ]),
]);
