export const useUser = () => {
  const getUser = () => $fetch("/api/user");
  return { getUser };
};
