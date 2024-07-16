import { createApi } from "@reduxjs/toolkit/query/react";
import { requestHandler } from "../requestHandler";

interface IUserInformation {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  is_verify_email: boolean;
  country: number | null;
  date_of_birthday: string | null;
  photo: string | null;
}

interface ILanguage {
  id: number;
  language: number;
  level: number;
  description: string;
  price?: number;
  files?: { id: number; file: string }[];
}

interface ISchedule {
  id: number;
  day: number;
  time_start: string;
  time_end: string;
}

export interface IProfileInformation {
  user: IUserInformation;
  languages: ILanguage[];
  schedules?: ISchedule[];
}

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: requestHandler,
  tagTypes: ["Profile"],
  endpoints: (builder) => ({
    getProfile: builder.query<IProfileInformation, { isStudent: boolean }>({
      query: (params) => {
        const { isStudent } = params;
        return {
          url: isStudent ? "/student" : "/teacher",
          method: "GET",
        };
      },
      providesTags: ["Profile"],
    }),
    deleteStudentLanguage: builder.mutation<void, number[]>({
      query: (id) => ({
        url: "/student/learning/languages",
        method: "POST",
        body: { delete: id },
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const { useGetProfileQuery, useDeleteStudentLanguageMutation } = profileApi;
