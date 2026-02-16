import { getApi } from "../utils/bknd";

export default defineEventHandler(async (event) => {
  const api = await getApi({ verify: true, headers: event.headers });
  const user = api.getUser();
  return { user };
});
