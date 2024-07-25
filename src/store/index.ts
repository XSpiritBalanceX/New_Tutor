import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { profileApi } from "./requestApi/profileApi";
import { searchApi } from "./requestApi/searchApi";

import tutorSlice from "./tutorSlice";

export const store = configureStore({
  reducer: {
    tutor: tutorSlice,
    [profileApi.reducerPath]: profileApi.reducer,
    [searchApi.reducerPath]: searchApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(profileApi.middleware, searchApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
