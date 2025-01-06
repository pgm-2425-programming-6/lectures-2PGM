import { decode } from "base64-arraybuffer";
import { API } from "@core/networking/api";

export const uploadImage = async (bucket: string, file: string, fileName: string) => {
  const { data, error } = await API.storage.from(bucket).upload(fileName, decode(file), {
    contentType: "image/jpg",
  });
  if (error) {
    return Promise.reject(error);
  }
  return Promise.resolve(data);
};
