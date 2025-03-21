import { Hono } from "hono";
import { prettyJSON } from "hono/pretty-json";

const app = new Hono();

app.use(prettyJSON());

app.get("/", (c) => {
  return c.json({ message: "Hello, World!" });
});

export default {
  port: Bun.env.PORT || 3000,
  fetch: app.fetch,
};
