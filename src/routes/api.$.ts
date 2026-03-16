import { createFileRoute } from "@tanstack/react-router";
import config from "../../bknd.config";
import { serve } from "bknd/adapter/tanstack-start";
import { env } from "cloudflare:workers";

const handler = serve(config(env), env);

export const Route = createFileRoute("/api/$")({
  server: {
    handlers: {
      ANY: async ({ request }) => await handler(request),
    },
  },
});
