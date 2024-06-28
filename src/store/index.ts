import { configureStore } from "@reduxjs/toolkit";

import tutorSlice from "./tutorSlice";

export const store = configureStore({
  reducer: {
    tutor: tutorSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
