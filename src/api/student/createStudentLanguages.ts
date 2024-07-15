import { axiosInstance } from "@axiosApi/axiosAPI";

interface ILearningLanguage {
  language: number;
  level: number;
  description: string;
}

export const createStudentLanguages = async (data: { create: ILearningLanguage[] }) => {
  const response = await axiosInstance.post("/student/learning/languages", data);

  return response;
};
