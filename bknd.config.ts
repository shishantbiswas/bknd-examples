import { em, entity, text, boolean, libsql, type Connection } from "bknd";

import type { TanstackStartConfig } from "bknd/adapter/tanstack-start";
import { registerLocalMediaAdapter } from "bknd/adapter/node";
import { secureRandomString } from "bknd/utils";

const local = registerLocalMediaAdapter();

const schema = em({
  todos: entity("todos", {
    title: text(),
    done: boolean(),
  }),
});

// register your schema to get automatic type completion
type Database = (typeof schema)["DB"];
declare module "bknd" {
  interface DB extends Database { }
}

function getDBConnection(): Connection | { url: ":memory:" | (string & {}) } {
  if (process.env.NODE_ENV !== "production") return { url: ":memory:" };

  return libsql({
    url: process.env.DATABASE_URL,
  })
}


export default {
  connection: getDBConnection(),
  options: {
    // the seed option is only executed if the database was empty
    seed: async (ctx) => {
      // create some entries
      await ctx.em.mutator("todos").insertMany([
        { title: "Learn bknd", done: true },
        { title: "Build something cool", done: false },
      ]);

      // and create a user
      await ctx.app.module.auth.createUser({
        email: "test@bknd.io",
        password: "12345678",
      });
    },
  },
  config: {
    data: schema.toJSON(),
    auth: {
      enabled: true,
      jwt: {
        secret: secureRandomString(32),
      }
    },
    media: {
      enabled: true,
      adapter: local({
        path: "./public/uploads",
      }),
    },
  },
} satisfies TanstackStartConfig;
