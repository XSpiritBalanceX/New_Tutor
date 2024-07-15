import { axiosInstance } from "@axiosApi/axiosAPI";

interface ISignUp {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  device?: string;
  user_type: number;
  country: number | null;
  date_of_birthday: string | null;
}

interface IResponse {
  data: {
    access_token: string;
    refresh_token: string;
  };
}

export const signUp = async (data: ISignUp) => {
  const { device = "postman", ...rest } = data;

  const response: IResponse = await axiosInstance.post("/auth/signup/base", { ...rest, device });

  return response;
};
