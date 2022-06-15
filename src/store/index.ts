import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import courtReducer from "./reducer/courtSlices/courtSizeSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      courtSize: courtReducer,
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
