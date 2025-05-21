"use client";

import { useTransition } from "react";
import { authClient } from "@/lib/auth-client";

type LogoutButtonProps = {
  className?: string;
};

const buttonStyles = {
  display: "inline-block",
  padding: "0.5rem 1rem",
  background: "#0070f3",
  color: "white",
  border: "none",
  borderRadius: "4px",
  fontSize: "1rem",
  fontWeight: "500",
  cursor: "pointer",
};

const disabledButtonStyles = {
  ...buttonStyles,
  opacity: 0.7,
  cursor: "not-allowed",
};

export function LogoutButton({ className }: LogoutButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleSignOut = () => {
    startTransition(() => {
      authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            window.location.href = "/user/login";
          },
        },
      });
    });
  };

  return (
    <button
      onClick={handleSignOut}
      disabled={isPending}
      style={isPending ? disabledButtonStyles : buttonStyles}
      className={className}
    >
      {isPending ? "Logging out..." : "Log Out"}
    </button>
  );
}

