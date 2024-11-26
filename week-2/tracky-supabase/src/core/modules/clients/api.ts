import { API } from "@core/networking/api";
import { Client } from "./types";

export const getClients = async (): Promise<Client[] | null> => {
  const { data } = await API.from("clients").select("*").order("name").throwOnError();
  return Promise.resolve(data);
};
