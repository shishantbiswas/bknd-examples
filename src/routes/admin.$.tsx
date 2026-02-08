import { getApi } from "@/bknd";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import "bknd/dist/styles.css";
import { Admin } from "bknd/ui";

export const getUser = createServerFn({ method: "GET" }).handler(async () => {
  const headers = getRequestHeaders();
  const api = await getApi({ verify: true, headers });
  return { user: api.getUser() };
});

export const Route = createFileRoute("/admin/$")({
  component: RouteComponent,
  loader: async () => {
    const user = await getUser();
    return { user };
  },
});

function RouteComponent() {
  const { user } = Route.useLoaderData();
  console.log(user);

  return (
    <Admin
      withProvider={{
        user: {
          email: "ada@example.com",
          id: "",
          strategy: "",
        },
      }}
      config={{
        basepath: "/admin",
        logo_return_path: "/../",
        theme: "system",
      }}
      baseUrl="http://localhost:3000"
    />
  );
}
