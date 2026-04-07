import type { User } from "bknd";

export const useUser = () => {
  const getUser = () => $fetch("/api/user") as Promise<{ user: User }>;
  return { getUser };
};
