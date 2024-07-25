import { createApi } from "@reduxjs/toolkit/query/react";
import { requestHandler } from "../requestHandler";

interface ILanguageTeacher {
  id: number;
  language: number;
  level: number;
  price: number;
  description: string;
}

interface ITeacherInfo {
  id: number;
  first_name: string;
  last_name: string;
  rating: number;
  feedbacks_count: number;
  students_count: number;
  is_certified: boolean;
  is_native_speaker: boolean;
  photo: null | string;
  languages: ILanguageTeacher[];
}

interface IResponseSearch {
  page: number;
  isHasNextPage: boolean;
  all_items_count: number;
  items: ITeacherInfo[];
}

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: requestHandler,
  tagTypes: ["Search"],
  endpoints: (builder) => ({
    getTeachersList: builder.query<IResponseSearch, { currentPage: string; countTeachers: number }>({
      query: ({ currentPage, countTeachers }) => `/teachers?page=${currentPage}&count=${countTeachers}`,
      providesTags: ["Search"],
    }),
  }),
});

export const { useGetTeachersListQuery } = searchApi;
