import { axiosInstance } from "@axiosApi/axiosAPI";

interface ISignIn {
  email: string;
  password: string;
  device?: string;
}

interface IResponse {
  data: {
    access_token: string;
    refresh_token: string;
  };
}

export const signIn = async (data: ISignIn) => {
  const { device = "postman", ...rest } = data;
  const response: IResponse = await axiosInstance.post("/auth/signin", { ...rest, device });

  return response;
};
