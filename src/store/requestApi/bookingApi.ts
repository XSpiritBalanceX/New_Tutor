import { createApi } from "@reduxjs/toolkit/query/react";
import { bookingRequestHandler } from "@store/bookingRequestHandler";

interface ILesson {
  id: number;
  teacher_id: number;
  teacher_schedule_id: number;
  date: string;
}

interface IListLessons {
  count: number;
  all_items_count: number;
  items: ILesson[];
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
  }),
});

export const { useGetListLessonsQuery } = bookingApi;
