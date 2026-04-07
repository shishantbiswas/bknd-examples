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
  const pathname = event.path
  const request = toWebRequest(event);

  if (pathname.startsWith("/api") || pathname !== "/") {
    const res = await serve(config)(request);

    if (res && res.status !== 404) {
      return res;
    }
  }
});