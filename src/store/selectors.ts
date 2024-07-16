import { RootState } from ".";
import { IProfileInformation, IUserInformation, TTeacherLanguage } from "./requestApi/profileApi";

export const localeSelect = (state: RootState) => state.tutor.locale;

export const isLoginSelect = (state: RootState) => state.tutor.isLogin;

export const studentInformationSelect = (state: RootState) =>
  state.profileApi.queries['getProfile({"isStudent":true})']?.data as IProfileInformation;

export const teacherProfileInfoSelect = (state: RootState) =>
  (state.profileApi.queries['getProfile({"isStudent":false})']?.data as IProfileInformation)?.user as IUserInformation;

export const teacherLanguagesSelect = (state: RootState) =>
  (state.profileApi.queries['getProfile({"isStudent":false})']?.data as IProfileInformation)
    ?.languages as TTeacherLanguage[];
