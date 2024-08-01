import { createApi } from "@reduxjs/toolkit/query/react";
import { requestHandler } from "../requestHandler";

export interface ILesson {
  id: number;
  schedule_id: number;
  teacher_id: number;
  teacher_first_name: string;
  teacher_last_name: string;
  photo: string | null;
  date: string;
  time_start: string;
  time_end: string;
}

interface IResponseLessons {
  all_items_count: number;
  count: number;
  page: number;
  items: ILesson[];
}

export const lessonsApi = createApi({
  reducerPath: "lessonsApi",
  baseQuery: requestHandler,
  tagTypes: ["AllLessons"],
  endpoints: (builder) => ({
    getLessons: builder.query<IResponseLessons, { countLessons: number; currentPage: number }>({
      query: ({ countLessons, currentPage }) => `/book?count=${countLessons}&page=${currentPage}`,
      providesTags: ["AllLessons"],
    }),
  }),
});

export const { useGetLessonsQuery } = lessonsApi;
