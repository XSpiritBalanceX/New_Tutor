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
  is_canceled: boolean;
  reason: null | string;
}

export interface ILessonsInformation {
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
    getListLessons: builder.query<
      ILessonsInformation,
      { limit: number; offset: number; isStudent: boolean; lessons_type: string }
    >({
      query: ({ limit, offset, isStudent, lessons_type }) => {
        const url = isStudent ? `/student/booking` : `/teacher/booking`;
        return `${url}/?limit=${limit}&offset=${offset}&lesson_type=${lessons_type}`;
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
    deleteBookedLesson: builder.mutation<void, { lesson_id: number; isStudent: boolean }>({
      query: ({ lesson_id, isStudent }) => ({
        url: `/${isStudent ? "student/booking" : "teacher/booking"}/${lesson_id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["LessonsList"],
    }),
    cancelBookedLesson: builder.mutation<void, { lesson_id: number; isStudent: boolean; reason: string }>({
      query: ({ lesson_id, isStudent, reason }) => ({
        url: `/${isStudent ? "student/booking" : "teacher/booking"}/${lesson_id}/cancel/`,
        method: "POST",
        body: { reason },
      }),
      invalidatesTags: ["LessonsList"],
    }),
  }),
});

export const {
  useGetListLessonsQuery,
  useBookNewLessonsMutation,
  useDeleteBookedLessonMutation,
  useCancelBookedLessonMutation,
} = bookingApi;
