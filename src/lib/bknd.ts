import { App } from "bknd";
import config from "../../bknd.config";
import { getApp as getBkndApp } from "bknd/adapter/tanstack-start";

declare global {
  var __bknd: App | undefined
}

const getApp = async () => {
  if (!global.__bknd) {
    global.__bknd = await getBkndApp(config, process.env);
  }
  return global.__bknd;
}

export async function getApi({
  headers,
  verify,
}: {
  verify?: boolean;
  headers?: Headers;
}) {
  const app = await getApp();
  if (verify) {
    const api = app.getApi({ headers });
    await api.verifyAuth();
    return api;
  }

  return app.getApi();
}
