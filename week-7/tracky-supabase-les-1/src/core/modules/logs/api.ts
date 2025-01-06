import { API } from "@core/networking/api";
import { LogWithProject } from "./types";

export const getLogsByDate = async (date: Date): Promise<LogWithProject[] | null> => {
  const { data } = await API.from("logs")
    .select("*, project:projects(*)")
    .order("date")
    .eq("date", date)
    .throwOnError()
    .returns<LogWithProject[]>();
  return Promise.resolve(data);
};
