import { API } from "@core/networking/api";
import { Session } from "@supabase/supabase-js";

export const getCurrentSession = async (): Promise<Session | null> => {
  const {
    data: { session },
    error,
  } = await API.auth.getSession();

  if (error) {
    return null;
  }
  return session;
};

export type LoginBody = {
  email: string;
  password: string;
};

export const login = async ({ email, password }: LoginBody) => {
  const { data, error } = await API.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) {
    return Promise.reject(error);
  }
  return Promise.resolve(data.user);
};

export const logout = async () => {
  return API.auth.signOut();
};
