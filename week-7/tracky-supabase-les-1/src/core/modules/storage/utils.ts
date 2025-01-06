import { API } from "@core/networking/api";
import { Bucket } from "./types";

export const getAvatarUrl = (path: string) => {
  const { data } = API.storage.from(Bucket.Avatars).getPublicUrl(path);
  return data?.publicUrl;
};
