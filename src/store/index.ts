import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { profileApi } from "./requestApi/profileApi";
import { searchApi } from "./requestApi/searchApi";
import { teacherApi } from "./requestApi/teacherApi";

import tutorSlice from "./tutorSlice";

export const store = configureStore({
  reducer: {
    tutor: tutorSlice,
    [profileApi.reducerPath]: profileApi.reducer,
    [searchApi.reducerPath]: searchApi.reducer,
    [teacherApi.reducerPath]: teacherApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(profileApi.middleware, searchApi.middleware, teacherApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
