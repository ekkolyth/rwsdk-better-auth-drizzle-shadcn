import { defineApp } from "rwsdk/worker";
import { prefix, render, route } from "rwsdk/router";
import { Document } from "@/app/Document";
import { Home } from "@/app/pages/Home";
import { setCommonHeaders } from "src/headers";
import { auth } from "./lib/auth";
import { User } from "./db/schema/auth-schema";
import { userRoutes } from "./app/pages/user/routes";
import { env } from "cloudflare:workers";

export interface Env {
  DB: D1Database;
}

export type AppContext = {
  user: User | undefined;
  authUrl: string;
};

export default defineApp([
  setCommonHeaders(),
  async ({ ctx, request }) => {
    // attach auth url for better auth
    ctx.authUrl = env.BETTER_AUTH_URL;

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
    return auth.handler(request);
  }),
  render(Document, [
    route("/", () => {
      return (
        <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
          <h1>RedwoodSDK with Better Auth and Drizzle</h1>
          <p>Welcome to this example application!</p>
          <div style={{ margin: "1.5rem 0" }}>
            <a
              href="/home"
              style={{
                display: "inline-block",
                padding: "0.5rem 1rem",
                background: "#0070f3",
                color: "white",
                textDecoration: "none",
                borderRadius: "4px",
                fontWeight: "500",
              }}
            >
              Go to Home Page
            </a>
          </div>
          <p style={{ fontSize: "0.875rem", color: "#666" }}>
            Note: The home page is protected and requires authentication. You
            will be redirected to login if you're not signed in.
          </p>
        </div>
      );
    }),
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
