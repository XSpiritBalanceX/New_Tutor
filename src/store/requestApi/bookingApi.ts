import { createApi } from "@reduxjs/toolkit/query/react";
import { bookingRequestHandler } from "@store/bookingRequestHandler";

export interface ILessonUser {
  id: number;
  teacher_id?: number;
  student_id?: number;
  first_name: string;
  last_name: string;
  avatar: string | null;
  teacher_schedule_id: number;
  date: string;
  time: string;
  video_room_id: null | string;
}

interface IListLessons {
  count: number;
  all_items_count: number;
  items: ILessonUser[];
}

interface INewLesson {
  teacher_id: number;
  teacher_schedule_id: number;
  date: string;
}

export const bookingApi = createApi({
  reducerPath: "bookingApi",
  baseQuery: bookingRequestHandler,
  tagTypes: ["LessonsList"],
  endpoints: (builder) => ({
    getListLessons: builder.query<IListLessons, { limit: number; offset: number; isStudent: boolean }>({
      query: ({ limit, offset, isStudent }) => {
        const url = isStudent ? `/student/booking` : `/teacher/booking`;
        return `${url}/?limit=${limit}&offset=${offset}`;
      },
      providesTags: ["LessonsList"],
    }),
    bookNewLessons: builder.mutation<void, { new_lessons: INewLesson[] }>({
      query: ({ new_lessons }) => ({
        url: "/student/booking/",
        method: "POST",
        body: new_lessons,
      }),
    }),
  }),
});

export const { useGetListLessonsQuery, useBookNewLessonsMutation } = bookingApi;
