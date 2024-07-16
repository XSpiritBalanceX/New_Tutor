import { axiosInstance } from "@axiosApi/axiosAPI";

export const uploadAvatar = async (data: FormData) => {
  const response = await axiosInstance.post("/user/profile/photo", data);

  return response;
};
