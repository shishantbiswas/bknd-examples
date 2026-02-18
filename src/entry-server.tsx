// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/solid.svg" />
          {assets}
        </head>
        <body>
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));

if (typeof process !== "undefined") {
  process.on("unhandledRejection", (reason, promise) => {
    console.error("Caught Unhandled Rejection:", reason);
  });
  process.on("uncaughtException", (err) => {
    console.error("Caught Uncaught Exception:", err);
  });
}