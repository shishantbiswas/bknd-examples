import { createMiddleware } from "@solidjs/start/middleware";
import { createRuntimeApp, type RuntimeBkndConfig } from "bknd/adapter";
import config from "../../bknd.config";

async function getApp<Env = NodeJS.ProcessEnv>(
  config: RuntimeBkndConfig<Env>,
  args: Env = process.env as Env,
) {
  return await createRuntimeApp(config, args);
}

function serve(config: RuntimeBkndConfig) {
  return async (request: Request) => {
    const app = await getApp(config, process.env);
    return app.fetch(request);
  };
}

const handler = serve(config);

export default createMiddleware({
  onRequest: async (event) => {
    const url = new URL(event.request.url);
    const isMethodWithBody = ["POST", "PUT", "PATCH", "DELETE"].includes(
      event.request.method!,
    );
    const adminBasepath = config.adminOptions.adminBasepath;

    if (
      url.pathname.startsWith("/api") ||
      url.pathname.startsWith(adminBasepath)
    ) {
      if (url.pathname === adminBasepath + "/") {
        url.pathname = url.pathname.replace(adminBasepath + "/", adminBasepath);
      } else {
        url.pathname = url.pathname.replaceAll("//", "/");
      }

      const modifiedRequest = new Request(url.toString(), {
        method: event.request.method,
        headers: event.request.headers as HeadersInit,
        // @ts-expect-error - 'duplex' is required for streaming bodies in Node.js
        duplex: isMethodWithBody ? "half" : undefined,
        body: isMethodWithBody ? event.request.body : undefined,
      });
      const res = await handler(modifiedRequest);
      if (res && res.status !== 404) {
        return res;
      }
    }
  },
});
