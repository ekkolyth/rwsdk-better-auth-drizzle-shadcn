import { db } from "@/db/db";
import { user } from "@/db/schema";
import { LogoutButton } from "../shared/components";

const Home = async () => {
  const allUsers = await db.select().from(user).all();

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
        }}
      >
        <h1 style={{ margin: 0 }}>Home Page</h1>
        <LogoutButton className="button" />
      </div>

      <div
        style={{
          background: "#f5f5f5",
          padding: "1.5rem",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <h2>Users in Database</h2>
        <pre
          style={{
            background: "#fff",
            padding: "1rem",
            borderRadius: "4px",
            overflow: "auto",
            maxHeight: "400px",
          }}
        >
          {JSON.stringify(allUsers, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export { Home };
