import { axiosInstance } from "@axiosApi/axiosAPI";

export const uploadTeacherDocs = async (body: FormData[], ids: number[]) => {
  const promises = body.map((el, ind) => {
    return axiosInstance.post(`/teacher/teaching/languages/docs/${ids[ind]}`, el);
  });
  return await Promise.all(promises);
};
