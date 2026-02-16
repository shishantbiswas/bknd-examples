import { type RuntimeBkndConfig } from "bknd/adapter";
import config from "../../bknd.config";
import { getApp } from "../utils/bknd";

function serve(config: RuntimeBkndConfig) {
  return async (request: Request) => {
    const app = await getApp(config, process.env);
    return app.fetch(request);
  };
}

export default defineEventHandler(async (event) => {
  const request = toWebRequest(event);
  const url = new URL(request.url);
  const isMethodWithBody = ["POST", "PUT", "PATCH", "DELETE"].includes(
    request.method,
  );

  const adminBasepath = config.adminOptions.adminBasepath;
  // if (adminBasepath.endsWith("/")) adminBasepath.slice(0, -1);

  if (
    url.pathname.startsWith("/api") ||
    url.pathname.startsWith(adminBasepath)
  ) {
    if (url.pathname === adminBasepath + "/") {
      url.pathname = url.pathname.slice(0, -1);
    } else {
      url.pathname = url.pathname.replaceAll("//", "/");
    }

    const modifiedRequest = new Request(url.toString(), {
      method: request.method,
      headers: request.headers as HeadersInit,
      // @ts-expect-error - 'duplex' is required for streaming bodies in Node.js
      duplex: isMethodWithBody ? "half" : undefined,
      body: isMethodWithBody ? request.body : undefined,
    });
    const res = await serve(config)(modifiedRequest);
    if (res && res.status !== 404) {
      return res;
    }
  }
});
