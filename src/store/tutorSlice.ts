import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TOKEN_KEY, REFRESH_TOKEN_KEY, TOKEN_EXPIRES_KEY, USER_TYPE, REGISTER_STATE } from "@utils/appConsts";
import { LS_TOKEN_KEY } from "chat-frontend-library";
import { LS_WEBRTK_TOKEN_KEY } from "webrtc-frontend-library";

type MainState = {
  locale: string;
  isLogin: boolean;
  currentOpponentID: string;
  isOpenChat: boolean;
};

const languageCurrent = localStorage.getItem("tutor_lang");
const tokens = localStorage.getItem("tutor_access_token") && localStorage.getItem("tutor_refresh_token");

const initialState: MainState = {
  locale: languageCurrent ? languageCurrent : navigator.language === "ru" ? "ru" : "en",
  isLogin: tokens ? true : false,
  currentOpponentID: "",
  isOpenChat: false,
};

const tutorSlice = createSlice({
  name: "tutor",
  initialState,
  reducers: {
    changeLocale(state, action: PayloadAction<string>) {
      state.locale = action.payload;
      localStorage.setItem("tutor_lang", action.payload);
    },
    loginUser(
      state,
      action: PayloadAction<{
        isLogin: boolean;
        token: string;
        refreshToken: string;
        expiresIn: number;
        user_type: number;
        register_state: string;
      }>,
    ) {
      state.isLogin = action.payload.isLogin;
      if (action.payload.isLogin) {
        localStorage.setItem(TOKEN_KEY, action.payload.token);
        localStorage.setItem(REFRESH_TOKEN_KEY, action.payload.refreshToken);
        localStorage.setItem(TOKEN_EXPIRES_KEY, String(action.payload.expiresIn));
        localStorage.setItem(USER_TYPE, String(action.payload.user_type));
        localStorage.setItem(REGISTER_STATE, action.payload.register_state);
        localStorage.setItem(LS_TOKEN_KEY, action.payload.token);
        localStorage.setItem(LS_WEBRTK_TOKEN_KEY, action.payload.token);
      } else {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        localStorage.removeItem(TOKEN_EXPIRES_KEY);
        localStorage.removeItem(USER_TYPE);
        localStorage.removeItem(REGISTER_STATE);
        localStorage.removeItem(LS_TOKEN_KEY);
        localStorage.removeItem(LS_WEBRTK_TOKEN_KEY);
      }
    },
    setOpponentId(state, action: PayloadAction<string>) {
      state.currentOpponentID = action.payload;
    },
    changeOpenChat(state, action: PayloadAction<boolean>) {
      state.isOpenChat = action.payload;
    },
  },
});

export const { changeLocale, loginUser, setOpponentId, changeOpenChat } = tutorSlice.actions;

export default tutorSlice.reducer;
