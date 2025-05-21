import { AppContext } from "@/worker";
import { LoginForm } from "./LoginForm";

export function Login({ ctx }: { ctx: AppContext }) {
  const { authUrl } = ctx;

  console.log("authUrl", authUrl);

  return <LoginForm authUrl={authUrl} />;
}
