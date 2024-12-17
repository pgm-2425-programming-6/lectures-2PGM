import { useAuthContext } from "./AuthProvider";

const useUser = () => {
  const { user } = useAuthContext();
  if (!user) {
    throw new Error("User is not authenticated");
  }
  return user;
};

export default useUser;
