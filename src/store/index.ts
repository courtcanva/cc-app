import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import threePointLineReducer from "./reducer/courtSlices/threePointLineSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      threePointLine: threePointLineReducer,
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
