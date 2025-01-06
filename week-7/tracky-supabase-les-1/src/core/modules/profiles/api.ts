import { API } from "@core/networking/api";
import { Profile } from "./types";
import { uploadImage } from "../storage/api";
import { Bucket } from "../storage/types";

export const getProfiles = async (): Promise<Profile[] | null> => {
  const { data } = await API.from("profiles").select("*").order("last_name").throwOnError();
  return Promise.resolve(data);
};

export const getProfileById = async (id: string): Promise<Profile | null> => {
  const { data } = await API.from("profiles").select("*").eq("id", id).single().throwOnError();
  return Promise.resolve(data);
};

export const updateProfile = async (id: string, profile: Partial<Profile>) => {
  const { data } = await API.from("profiles").update(profile).eq("id", id).select().single().throwOnError();
  return Promise.resolve(data);
};

export const updateProfileAvatar = async (id: string, avatar: string) => {
  // 1. upload image
  const filename = `${id}/${Date.now()}.jpg`;

  await uploadImage(Bucket.Avatars, avatar, filename);
  // 2. update profile
  const data = await updateProfile(id, {
    avatar: filename,
  });

  return Promise.resolve(data);
};
