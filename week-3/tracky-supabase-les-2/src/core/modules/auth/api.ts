import { API } from "@core/networking/api";
import { Auth, Role } from "./types";

export const getCurrentSession = async (): Promise<Auth | null> => {
  const {
    data: { session },
    error,
  } = await API.auth.getSession();

  if (error || !session?.user) {
    return null;
  }
  const { user } = session;

  const role = await API.from("user_roles").select("*").eq("id", user.id).single();
  const profile = await API.from("profiles").select("*").eq("id", user.id).single();

  if (!profile.data || !role.data) {
    return null;
  }

  if (!profile.data || !role.data) {
    return null;
  }

  return {
    session,
    user: {
      email: user.email ?? "",
      ...profile.data,
      role: role.data.role as Role,
    },
  };
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
