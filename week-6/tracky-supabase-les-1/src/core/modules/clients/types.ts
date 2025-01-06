import { Tables, TablesInsert, TablesUpdate } from "@core/networking/database.types";

export type Client = Tables<"clients">;

export type CreateClientBody = TablesInsert<"clients">;
export type UpdateClientBody = TablesUpdate<"clients">;
