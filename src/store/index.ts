import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { profileApi } from "./requestApi/profileApi";
import { searchApi } from "./requestApi/searchApi";
import { teacherApi } from "./requestApi/teacherApi";
import { lessonsApi } from "./requestApi/lessonsApi";
import { chatApi, chatAppSlice, holaApi } from "chat-frontend-library";
import tutorSlice from "./tutorSlice";

export const store = configureStore({
  reducer: {
    tutor: tutorSlice,
    [profileApi.reducerPath]: profileApi.reducer,
    [searchApi.reducerPath]: searchApi.reducer,
    [teacherApi.reducerPath]: teacherApi.reducer,
    [lessonsApi.reducerPath]: lessonsApi.reducer,
    [holaApi.reducerPath]: holaApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
    [chatAppSlice.name]: chatAppSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      profileApi.middleware,
      searchApi.middleware,
      teacherApi.middleware,
      lessonsApi.middleware,
      holaApi.middleware,
      chatApi.middleware,
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
