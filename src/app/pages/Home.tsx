import { db } from "@/db/db";
import { user } from "@/db/schema";

const Home = async () => {
  const allUsers = await db.select().from(user).all();
  return (
    <div>
      <h1>Hello World</h1>
      <pre>{JSON.stringify(allUsers, null, 2)}</pre>
    </div>
  );
};

export { Home };
