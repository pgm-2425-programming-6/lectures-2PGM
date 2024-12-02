import { useEffect, useMemo, useState } from "react";
import { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { User } from "@core/modules/auth/types";
import { API } from "@core/networking/api";
import { getCurrentSession } from "@core/modules/auth/api";

const useSupabaseAuth = () => {
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [auth, setAuth] = useState<Session | null>(null);

  // 1. Bij opstarten checken of user is ingelogd?
  useEffect(() => {
    const checkAuth = async () => {
      const session = await getCurrentSession();
      // wil je een profile dan kan dat hier
      // bv. const profile = await getProfile(auth?.user.id);
      setAuth(session);
      setIsInitialized(true);
    };
    checkAuth();
  }, []);

  // 2. Daarna "watchen" -> is user nog steeds ingelogd?
  useEffect(() => {
    API.auth.onAuthStateChange((event: AuthChangeEvent, session) => {
      switch (event) {
        case "SIGNED_IN":
        case "USER_UPDATED":
        case "TOKEN_REFRESHED":
          // als je een profile hebt, ook hier ophalen
          setAuth(session);
          break;

        case "SIGNED_OUT":
          setAuth(null);
          break;
      }
    });
  }, []);

  const isLoggedIn = isInitialized && !!auth;

  const user: User | null = useMemo(() => {
    return auth
      ? {
          id: auth.user.id,
          email: auth.user.email!,
        }
      : null;
  }, [auth]);

  return {
    isLoggedIn,
    isInitialized,
    auth,
    user,
  };
};

export default useSupabaseAuth;
