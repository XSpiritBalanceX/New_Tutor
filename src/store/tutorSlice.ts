import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type MainState = {
  locale: string;
  isLogin: boolean;
};

const languageCurrent = localStorage.getItem("tutor_lang");
const tokens = localStorage.getItem("tutor_access_token") && localStorage.getItem("tutor_refresh_token");

const initialState: MainState = {
  locale: languageCurrent ? languageCurrent : navigator.language === "ru" ? "ru" : "en",
  isLogin: tokens ? true : false,
};

const tutorSlice = createSlice({
  name: "tutor",
  initialState,
  reducers: {
    changeLocale(state, action: PayloadAction<string>) {
      state.locale = action.payload;
      localStorage.setItem("tutor_lang", action.payload);
    },
    loginUser(state, action: PayloadAction<boolean>) {
      state.isLogin = action.payload;
      if (!action.payload) {
        localStorage.removeItem("tutor_access_token");
        localStorage.removeItem("tutor_refresh_token");
      }
    },
  },
});

export const { changeLocale, loginUser } = tutorSlice.actions;

export default tutorSlice.reducer;
