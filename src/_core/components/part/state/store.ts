import { configureStore } from "@reduxjs/toolkit";
import taskOpenReducer from './task-open.slice';

export const store = configureStore({
  reducer: {
    taskOpen: taskOpenReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;