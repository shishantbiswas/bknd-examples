import { em, entity, text, boolean, libsql, DatabaseEvents } from "bknd";
import { RuntimeBkndConfig } from "bknd/adapter";
import { registerLocalMediaAdapter } from "bknd/adapter/node";
import { secureRandomString } from "bknd/utils";
import { redis } from "~/lib/redis";
import { AppEvents } from "bknd";

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

const isDev = process.env.NODE_ENV !== "production";

export default {
  connection: isDev
    ? { url: "file:data.db" }
    : libsql({
      url: process.env.DATABASE_URL || "http://localhost:8080",
    }),
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
  //   drivers: {
  //     cache: {
  //       async del(key) {
  //         console.log("[CACHE] del ", key);
  //         await redis.del(key)
  //       },
  //       async get(key) {
  //         console.log("[CACHE] get ", key);
  //         return await redis.get(key) as string
  //       },
  //       async set(key, value, ttl) {
  //         console.log("[CACHE] set ", key, value, ttl);
  //         await redis.set(key, value, { expiration: { type: "EX", value: ttl ?? 60 } })
  //       },

  //     }
  //   }
  },
  async onBuilt(app) {
    app.emgr.onEvent(DatabaseEvents.MutatorDeleteAfter, async (event) => {
      // console.log("MutatorDeleteAfter received", event.params.entity.name);
      if (event.params.entity.name === "todos") {
        await redis.publish('db_invalidation', 'todos_data');
      }
    });
    app.emgr.onEvent(DatabaseEvents.MutatorInsertAfter, async (event) => {
      // console.log("MutatorInsertAfter received", event.params);
      if (event.params.entity.name === "todos") {
        await redis.publish('db_invalidation', 'todos_data');
      }
    });

    app.emgr.onEvent(DatabaseEvents.MutatorUpdateAfter, async (event) => {
      // console.log("MutatorUpdateAfter received", event.params);
      if (event.params.entity.name === "todos") {
        await redis.publish('db_invalidation', 'todos_data');
      }
    });

  },
  config: {
    data: schema.toJSON(),
    auth: {
      enabled: true,
      jwt: {
        secret: secureRandomString(32),
      },
    },
    media: {
      enabled: true,
      adapter: local({
        path: "./public/uploads",
      }),
    },
  },
  adminOptions: {
    adminBasepath: "/admin",
    assetsPath: "/admin/",
  },
} satisfies RuntimeBkndConfig;
