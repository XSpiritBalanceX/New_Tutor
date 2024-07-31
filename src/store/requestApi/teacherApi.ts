import { createApi } from "@reduxjs/toolkit/query/react";
import { requestHandler } from "../requestHandler";

export interface ITeacherInformation {
  id: number;
  first_name: string;
  last_name: string;
  photo: null | string;
}

interface ITeacherLanguage {
  id: number;
  language: number;
  level: number;
  price: number;
  description: string;
  files: { id: number; file: string }[];
}

interface ITeacherLesson {
  id: number;
  day: number;
  time_start: string;
  time_end: string;
}

interface IResponseTeacher {
  user: ITeacherInformation;
  languages: ITeacherLanguage[];
  schedules: ITeacherLesson[];
}

interface ILesson {
  teacher_id: number;
  schedule_id: number;
  date: string;
}

export const teacherApi = createApi({
  reducerPath: "teacherApi",
  baseQuery: requestHandler,
  tagTypes: ["Teacher"],
  endpoints: (builder) => ({
    getTeacher: builder.query<IResponseTeacher, { teacher_id: string }>({
      query: ({ teacher_id }) => ({
        url: `/teacher?teacher_id=${teacher_id}`,
        method: "GET",
      }),
      providesTags: ["Teacher"],
    }),
    bookLessons: builder.mutation<void, { booked_lessons: ILesson[] }>({
      query: ({ booked_lessons }) => ({
        url: "/book",
        method: "POST",
        body: { lessons: booked_lessons },
      }),
    }),
  }),
});

export const { useGetTeacherQuery, useBookLessonsMutation } = teacherApi;
