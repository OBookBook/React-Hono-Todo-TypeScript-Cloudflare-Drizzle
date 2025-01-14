import { Hono } from "hono";
import { todos } from "./db/schema";
import { drizzle } from "drizzle-orm/d1";

interface Bindings {
  DB: D1Database;
}

const app = new Hono<{ Bindings: Bindings }>();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/todos", async (c) => {
  const db = drizzle(c.env.DB);
  try {
    const result = await db.select().from(todos).all();
    return c.json(result);
  } catch (error) {
    return c.json({ error: "Failed to fetch todos" }, 500);
  }
});

export default app;
