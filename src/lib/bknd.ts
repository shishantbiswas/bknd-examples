import { createRuntimeApp, type RuntimeBkndConfig } from "bknd/adapter";
import bkndConfig from "../../bknd.config";
import { App } from "bknd";

let client: App | null = null;

export async function getBkndApp<Env = NodeJS.ProcessEnv>(
  config: RuntimeBkndConfig<Env>,
  args: Env = process.env as Env,
) {
  return await createRuntimeApp(config, args);
}

export const getApp = async () => {
  if (!client) {
    client = await getBkndApp(bkndConfig);
  }
  return client;
};

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
