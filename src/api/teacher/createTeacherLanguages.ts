import { axiosInstance } from "@axiosApi/axiosAPI";

interface ITeachingLanguage {
  language: number;
  level: number;
  description: string;
  price: number;
}

interface IResponse {
  data: {
    created_ids: number[];
  };
}

export const createTeacherLanguages = async (data: { create: ITeachingLanguage[] }) => {
  const response: IResponse = await axiosInstance.post("/teacher/teaching/languages", data);

  return response;
};
