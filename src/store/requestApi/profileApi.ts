import { createApi } from "@reduxjs/toolkit/query/react";
import { requestHandler } from "../requestHandler";
import { TNewLanguage, TUpdateLanguage } from "@components/settingTeacherLanguages/TypesSettingLanguages";

export interface IUserInformation {
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

interface INewLanguage {
  language: number;
  level: number;
  description: string;
}

export interface ISchedule {
  id: number;
  day: number;
  time_start: string;
  time_end: string;
}

interface INewSchedule {
  day: number;
  time_start: string;
  time_end: string;
}

export interface IProfileInformation {
  user: IUserInformation;
  languages: ILanguage[];
  schedules?: ISchedule[];
}

type TUpdateUser = {
  first_name: string;
  last_name: string;
  date_of_birthday: string;
  country: number | null;
};

export type TTeacherLanguage = {
  id: number;
  language: number;
  level: number;
  description: string;
  price: number;
  files: { id: number; file: string }[];
};

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
    updateStudentLanguages: builder.mutation<void, { newLanguages: INewLanguage[]; updateLanguages: ILanguage[] }>({
      query: (params) => ({
        url: "/student/learning/languages",
        method: "POST",
        body: { create: params.newLanguages, update: params.updateLanguages },
      }),
      invalidatesTags: ["Profile"],
    }),
    updateUserInformation: builder.mutation<void, TUpdateUser>({
      query: (info) => ({
        url: "/user/profile",
        method: "POST",
        body: info,
      }),
      invalidatesTags: ["Profile"],
    }),
    updateTeacherLanguages: builder.mutation<
      {
        created_ids: number[];
      },
      { newLanguages: TNewLanguage[]; updateLanguages: TUpdateLanguage[] }
    >({
      query: (params) => ({
        url: "/teacher/teaching/languages",
        method: "POST",
        body: { create: params.newLanguages, update: params.updateLanguages },
      }),
    }),
    deleteTeacherLanguage: builder.mutation<void, number[]>({
      query: (id) => ({
        url: "/teacher/teaching/languages",
        method: "POST",
        body: { delete: id },
      }),
      invalidatesTags: ["Profile"],
    }),
    deleteTeacherDocs: builder.mutation<void, { idFile: number; idLanguage: number }>({
      query: (params) => ({
        url: "/teacher/teaching/languages/docs",
        method: "DELETE",
        body: { id: params.idFile, language_id: params.idLanguage },
      }),
      invalidatesTags: ["Profile"],
    }),
    updateTeacherSchedule: builder.mutation<void, { createLesson: INewSchedule[]; deleteLesson: number[] }>({
      query: (params) => ({
        url: "/teacher/schedules",
        method: "POST",
        body: { create: params.createLesson, delete: params.deleteLesson },
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useDeleteStudentLanguageMutation,
  useUpdateStudentLanguagesMutation,
  useUpdateUserInformationMutation,
  useUpdateTeacherLanguagesMutation,
  useDeleteTeacherLanguageMutation,
  useDeleteTeacherDocsMutation,
  useUpdateTeacherScheduleMutation,
} = profileApi;
