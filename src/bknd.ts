// import { getApp as getBkndApp } from "bknd/adapter/nextjs";
import config from "../bknd.config";
import { BkndConfig, createFrameworkApp } from "bknd/adapter";

// --------------------------------- TANSTACK ADAPTER PROTOTYPE -----------------------------------
export async function getApp<Env = NodeJS.ProcessEnv>(
  config: BkndConfig<Env>,
  args: Env = process.env as Env,
) {
  return await createFrameworkApp(config, args);
}
// --------------------------------- TANSTACK ADAPTER PROTOTYPE -----------------------------------

export async function getApi({
  headers,
  verify,
}: {
  verify?: boolean;
  headers?: Headers;
}) {
  const app = await getApp(config, process.env);
  // const app = await getBkndApp(config, process.env);

  if (verify) {
    const api = app.getApi({ headers });
    await api.verifyAuth();
    return api;
  }

  return app.getApi();
}
