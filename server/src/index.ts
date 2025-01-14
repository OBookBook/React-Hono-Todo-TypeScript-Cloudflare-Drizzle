import { Hono } from "hono";
import { eq } from "drizzle-orm";
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

/**
 * POST: http://127.0.0.1:8787/todos
 * Request
 * {
 *   "title": "test"
 * }
 */
app.post("/todos", async (c) => {
  try {
    const params = await c.req.json<typeof todos.$inferInsert>();
    const db = drizzle(c.env.DB);
    const result = await db
      .insert(todos)
      .values({ title: params.title })
      .execute();

    return c.json(result);
  } catch (error) {
    return c.json({ error: "Failed to fetch todos" }, 500);
  }
});

/**
 * PUT: http://127.0.0.1:8787/todos
 * Request
 * {
 *   "title": "update!!"
 * }
 */
app.put("/todos/:id", async (c) => {
  const id = parseInt(c.req.param("id"));

  if (isNaN(id)) return c.json({ error: "Invalid ID" }, 400);

  try {
    const params = await c.req.json<typeof todos.$inferSelect>();
    const db = drizzle(c.env.DB);
    const result = await db
      .update(todos)
      .set({ title: params.title, status: params.status })
      .where(eq(todos.id, id));

    return c.json(result);
  } catch (error) {
    return c.json({ error: "Failed to update todos" }, 500);
  }
});

/**
 * DELETE: http://127.0.0.1:8787/todos/6
 */
app.delete("/todos/:id", async (c) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) return c.json({ error: "Invalid ID" }, 400);

  try {
    const db = drizzle(c.env.DB);
    const result = await db.delete(todos).where(eq(todos.id, id));
    return c.json(result);
  } catch (error) {
    return c.json({ error: "Failed to delete todos" }, 500);
  }
});

export default app;
