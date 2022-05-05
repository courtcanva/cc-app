import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import counterReducer from "./reducer/counterSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      counter: counterReducer,
    },
  });

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
