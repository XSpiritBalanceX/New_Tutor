import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosRequestHandler } from "@store/axiosRequestHandler";

interface ILesson {
  id: number;
  teacher_id: number;
  teacher_schedule_id: number;
  date: string;
}

export const bookingApi = createApi({
  reducerPath: "bookingApi",
  baseQuery: axiosRequestHandler,
  tagTypes: ["LessonsList"],
  endpoints: (builder) => ({
    getListLessons: builder.query<ILesson[], { limit: number; offset: number; isStudent: boolean }>({
      query: ({ limit, offset, isStudent }) => {
        const url = isStudent ? `/student/booking` : `/teacher/booking`;
        return `${url}/?limit=${limit}&offset=${offset}`;
      },
      providesTags: ["LessonsList"],
    }),
  }),
});

export const { useGetListLessonsQuery } = bookingApi;