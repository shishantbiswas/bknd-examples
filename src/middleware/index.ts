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
    // const isMethodWithBody = ["POST", "PUT", "PATCH", "DELETE"].includes(
    //   event.request.method!,
    // );
    // const adminBasepath = config.adminOptions.adminBasepath;

    // if (
    //   url.pathname.startsWith("/api") ||
    //   url.pathname.startsWith(adminBasepath)
    // ) {
    //   if (url.pathname === adminBasepath + "/") {
    //     url.pathname = url.pathname.replace(adminBasepath + "/", adminBasepath);
    //   } else {
    //     url.pathname = url.pathname.replaceAll("//", "/");
    //   }

    //   const modifiedRequest = new Request(url.toString(), {
    //     method: event.request.method,
    //     headers: event.request.headers as HeadersInit,
    //     // @ts-expect-error - 'duplex' is required for streaming bodies in Node.js
    //     duplex: isMethodWithBody ? "half" : undefined,
    //     body: isMethodWithBody ? event.request.body : undefined,
    //   });
    //   const res = await handler(modifiedRequest);
    //   if (res && res.status !== 404) {
    //     return res;
    //   }
    // }
    const pathname = url.pathname;

    const adminOptions = (config as RuntimeBkndConfig).adminOptions;
    const adminPath = adminOptions ? adminOptions.adminBasepath ?? "" : "";

    const basepath = adminPath.endsWith("/") ? adminPath.slice(0, -1) : adminPath;

    if (pathname === basepath && Boolean(adminPath)) {
      return Response.redirect(new URL(basepath + "/data", "http://localhost:3000"))
    };

    if (pathname.startsWith("/api") || pathname !== "/" && pathname.startsWith(basepath)) {
      const res = await handler(event.request);

      if (res && res.status !== 404) {
        return res;
      }
    }
  },
});
