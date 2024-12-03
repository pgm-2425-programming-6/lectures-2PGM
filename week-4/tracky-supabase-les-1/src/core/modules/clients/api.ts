import { API } from "@core/networking/api";
import { Client, CreateClientBody, UpdateClientBody } from "./types";

export const getClients = async (): Promise<Client[] | null> => {
  const { data } = await API.from("clients").select("*").order("name").throwOnError();
  return Promise.resolve(data);
};

export const getClientById = async (uid: string | number): Promise<Client | null> => {
  const response = await API.from("clients").select("*").eq("id", uid).throwOnError().single();
  return Promise.resolve(response.data);
};

export const createClient = async (body: CreateClientBody): Promise<Client | null> => {
  const { data } = await API.from("clients").insert(body).throwOnError().single();
  return Promise.resolve(data);
};

export const updateClient = async (body: UpdateClientBody): Promise<Client | null> => {
  if (!body.id) {
    throw new Error("Client id is required");
  }
  const { data } = await API.from("clients").update(body).eq("id", body.id).throwOnError().single();
  return Promise.resolve(data);
};
