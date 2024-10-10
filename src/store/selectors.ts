import { RootState } from ".";
import { IProfileInformation, IUserInformation, TTeacherLanguage, ISchedule } from "./requestApi/profileApi";

export const localeSelect = (state: RootState) => state.tutor.locale;

export const currentOpponentIDSelect = (state: RootState) => state.tutor.currentOpponentID;

export const isOpenChatSelect = (state: RootState) => state.tutor.isOpenChat;

export const isLoginSelect = (state: RootState) => state.tutor.isLogin;

export const studentInformationSelect = (state: RootState) =>
  state.profileApi.queries['getProfile({"isStudent":true})']?.data as IProfileInformation;

export const teacherProfileInfoSelect = (state: RootState) =>
  (state.profileApi.queries['getProfile({"isStudent":false})']?.data as IProfileInformation)?.user as IUserInformation;

export const teacherLanguagesSelect = (state: RootState) =>
  (state.profileApi.queries['getProfile({"isStudent":false})']?.data as IProfileInformation)
    ?.languages as TTeacherLanguage[];

export const teacherScheduleSelect = (state: RootState) =>
  (state.profileApi.queries['getProfile({"isStudent":false})']?.data as IProfileInformation)?.schedules as ISchedule[];

export const studentProfileError = (state: RootState) =>
  state.profileApi.queries['getProfile({"isStudent":true})']?.error;

export const teacherProfileError = (state: RootState) =>
  state.profileApi.queries['getProfile({"isStudent":false})']?.error;
