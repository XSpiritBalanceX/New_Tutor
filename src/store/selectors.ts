import { RootState } from ".";

export const localeSelect = (state: RootState) => state.tutor.locale;

export const isLoginSelect = (state: RootState) => state.tutor.isLogin;
