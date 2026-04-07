import { createRuntimeApp, type RuntimeBkndConfig } from "bknd/adapter";
import bkndConfig from "../../bknd.config";
import { App } from "bknd";

let client: App | null = null;

export async function getApp<Env = NodeJS.ProcessEnv>(
  config: RuntimeBkndConfig<Env>,
  args: Env = process.env as Env,
) {
  if (!client) {
    client = await createRuntimeApp(config, args);
  }
  return client;
};

export async function getApi(opt?: {
  verify?: boolean;
  headers?: Headers;
}) {
  const app = await getApp(bkndConfig, process.env);

  if (opt?.verify) {
    const api = app.getApi({ headers: opt ? opt.headers : undefined });
    await api.verifyAuth();
    return api;
  }

  return app.getApi();
}
