import { API } from "@core/networking/api";
import { Profile } from "./types";

export const getProfiles = async (): Promise<Profile[] | null> => {
  const { data } = await API.from("profiles").select("*").order("last_name").throwOnError();
  return Promise.resolve(data);
};
