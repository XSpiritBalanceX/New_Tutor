import { RootState } from ".";
import { IProfileInformation } from "./requestApi/profileApi";

export const localeSelect = (state: RootState) => state.tutor.locale;

export const isLoginSelect = (state: RootState) => state.tutor.isLogin;

export const studentInformationSelect = (state: RootState) =>
  state.profileApi.queries['getProfile({"isStudent":true})']?.data as IProfileInformation;
