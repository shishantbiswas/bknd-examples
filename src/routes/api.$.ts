import { createFileRoute } from "@tanstack/react-router";
import { config } from "@/bknd";
import { serve } from "bknd/adapter/nextjs";

const handler = serve({
  ...config,
  // cleanRequest: {
    // depending on what name you used for the catch-all route,
    // you need to change this to clean it from the request.
  //   searchParams: ["$"],
  // },
});

export const Route = createFileRoute("/api/$")({
  server: {
    handlers: {
      ANY: async ({ request }) => {
        const res = await handler(request);
        // console.log("[API] ", res);

        return res;
      },
    },
  },
});
