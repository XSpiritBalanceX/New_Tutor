import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { profileApi } from "./requestApi/profileApi";
import { searchApi } from "./requestApi/searchApi";
import { teacherApi } from "./requestApi/teacherApi";
import { chatApi, chatAppSlice, holaApi } from "chat-frontend-library";
import tutorSlice from "./tutorSlice";
import { bookingApi } from "./requestApi/bookingApi";

export const store = configureStore({
  reducer: {
    tutor: tutorSlice,
    [profileApi.reducerPath]: profileApi.reducer,
    [searchApi.reducerPath]: searchApi.reducer,
    [teacherApi.reducerPath]: teacherApi.reducer,
    [holaApi.reducerPath]: holaApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
    [chatAppSlice.name]: chatAppSlice.reducer,
    [bookingApi.reducerPath]: bookingApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      profileApi.middleware,
      searchApi.middleware,
      teacherApi.middleware,
      holaApi.middleware,
      chatApi.middleware,
      bookingApi.middleware,
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
