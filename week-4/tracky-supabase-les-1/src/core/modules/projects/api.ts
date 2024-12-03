import { API } from "@core/networking/api";
import { Project, CreateProjectBody, UpdateProjectBody, ProjectWithClient } from "./types";

export const getProjects = async (): Promise<ProjectWithClient[] | null> => {
  const { data } = await API.from("projects")
    .select("*, client:clients(*)")
    .order("name")
    .throwOnError()
    .returns<ProjectWithClient[]>();
  return Promise.resolve(data);
};

export const getProjectById = async (uid: string | number): Promise<ProjectWithClient | null> => {
  const response = await API.from("projects")
    .select("*, client:clients(*)")
    .eq("id", uid)
    .throwOnError()
    .returns<ProjectWithClient>()
    .single();
  return Promise.resolve(response.data);
};

export const createProject = async (body: CreateProjectBody): Promise<Project | null> => {
  // select() is used to return the inserted data
  const { data } = await API.from("projects").insert(body).throwOnError().select().single();
  return Promise.resolve(data);
};

export const updateProject = async (body: UpdateProjectBody): Promise<Project | null> => {
  if (!body.id) {
    throw new Error("Project id is required");
  }
  const { data } = await API.from("projects").update(body).eq("id", body.id).throwOnError().select().single();
  return Promise.resolve(data);
};
