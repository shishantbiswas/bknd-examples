import { createMiddleware } from "@solidjs/start/middleware";
import config from "../../bknd.config";
import { getApp } from "~/lib/bknd";
import { RuntimeBkndConfig } from "bknd/adapter";
import bkndConfig from "../../bknd.config";

function serve() {
  return async (request: Request) => {
    const app = await getApp();
    return app.fetch(request);
  };
}

const handler = serve();

export default createMiddleware({
  onRequest: async (event) => {
    const url = new URL(event.request.url);
    const pathname = url.pathname;

    if (pathname.startsWith("/api") || pathname !== "/") {
      const res = await handler(event.request);

      if (res && res.status !== 404) {
        return res;
      }
    }
  },
});
