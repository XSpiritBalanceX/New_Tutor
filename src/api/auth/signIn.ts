import { axiosInstance } from "@axiosApi/axiosAPI";

interface ISignIn {
  email: string;
  password: string;
}

interface IResponse {
  data: {
    access_token: string;
    refresh_token: string;
  };
}

export const signIn = async (data: ISignIn) => {
  const response: IResponse = await axiosInstance.post("/auth/login/", data);

  return response;
};
