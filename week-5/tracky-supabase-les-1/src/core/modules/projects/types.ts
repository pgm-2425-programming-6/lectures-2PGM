import { Client } from "@core/modules/clients/types";
import { Tables, TablesInsert, TablesUpdate } from "@core/networking/database.types";

export type Project = Tables<"projects">;

export type ProjectWithClient = Project & {
  client: Client;
};

export type CreateProjectBody = TablesInsert<"projects">;
export type UpdateProjectBody = TablesUpdate<"projects">;
