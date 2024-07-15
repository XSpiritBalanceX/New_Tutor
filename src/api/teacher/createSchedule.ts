import { axiosInstance } from "@axiosApi/axiosAPI";

interface ISchedule {
  day: number;
  time_start: string;
  time_end: string;
}

export const createSchedule = async (data: { create: ISchedule[] }) => {
  const response = await axiosInstance.post("/teacher/schedules", data);

  return response;
};
