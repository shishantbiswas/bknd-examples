import { em, entity, text, boolean } from "bknd";
import { d1 } from "bknd/adapter/cloudflare";

import type { TanstackStartConfig } from "bknd/adapter/tanstack-start";

const schema = em({
  todos: entity("todos", {
    title: text(),
    done: boolean(),
  }),
});

// Types remain in global scope
type Database = (typeof schema)["DB"];
declare module "bknd" {
  interface DB extends Database { }
}

export default (context: Env) => ({
  connection: d1({ binding: context.DB }), // Access DB from the passed context
  options: {
    seed: async (ctx) => {
      await ctx.em.mutator("todos").insertMany([
        { title: "Learn bknd", done: true },
        { title: "Build something cool", done: false },
      ]);
      await ctx.app.module.auth.createUser({
        email: "test@bknd.io",
        password: "12345678",
      });
    },
  },
  config: {
    data: schema.toJSON(),
  },
}) satisfies TanstackStartConfig<Env>;