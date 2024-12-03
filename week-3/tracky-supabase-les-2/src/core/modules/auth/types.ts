import { Session } from "@supabase/supabase-js";
import { Profile } from "../profiles/types";

export type Auth = {
  session: Session;
  user: User;
};

export type User = {
  id: string;
  email: string;
  role: Role;
} & Profile;

export enum Role {
  Admin = "admin",
  User = "user",
}
