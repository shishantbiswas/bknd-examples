import { createFileRoute } from "@tanstack/react-router";
import config from "../../bknd.config";
import { BkndConfig, createFrameworkApp } from "bknd/adapter";

// import { getApp } from "bknd/adapter/nextjs";
// const handler = serve({
//   ...config,
// });

// --------------------------------- TANSTACK ADAPTER PROTOTYPE -----------------------------------

export async function getApp<Env = NodeJS.ProcessEnv>(
  config: BkndConfig<Env>,
  args: Env = process.env as Env,
) {
  return await createFrameworkApp(config, args);
}

function serve(config: BkndConfig) {
  return async (request: Request) => {
    const app = await getApp(config, process.env);
    return app.fetch(request);
  };
}

const handler = serve(config);

// --------------------------------- TANSTACK ADAPTER PROTOTYPE -----------------------------------

export const Route = createFileRoute("/api/$")({
  server: {
    handlers: {
      ANY: async ({ request }) => await handler(request),
    },
  },
});
