import { Auth, User } from "@core/modules/auth/types";
import { createContext, useContext } from "react";
import useSupabaseAuth from "./useSupabaseAuth";

type AuthContextType = {
  isLoggedIn: boolean;
  user?: User | null;
  auth: Auth | null;
  refresh: () => Promise<Auth | null>;
  login: (email: string, password: string) => Promise<Auth | null>;
};

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  auth: null,
  refresh: () => Promise.resolve(null),
  login: () => Promise.resolve(null),
});

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const { isLoggedIn, isInitialized, login, refresh, auth, user } = useSupabaseAuth();

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        auth,
        login,
        refresh,
      }}
    >
      {isInitialized ? children : null}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
