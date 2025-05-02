import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { handle } from "hono/vercel";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";

export const runtime = "edge";

const app = new Hono().basePath("/api");

app
  .get("/hello", clerkMiddleware(), (c) => {
    const auth = getAuth(c);

    if (!auth?.userId) {
      return c.json({ error: "Unauthorized" });
    }
    
    return c.json({
      message: "Hello Next.js!",
    });
  })
  .get(
    "/hello/:p",
    zValidator(
      "param",
      z.object({
        value: z.string(),
      })
    ),
    (c) => {
      const { value } = c.req.valid("param");
      return c.json({
        message: "Hello from params call",
        id: value,
      });
    }
  )
  .post(
    "/",
    zValidator(
      "json",
      z.object({
        name: z.string(),
        userId: z.number(),
      })
    ),
    (c) => {
      const { name, userId } = c.req.valid("json");
      return c.json({});
    }
  );

export const GET = handle(app);
export const POST = handle(app);
