import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import courtReducer from "./reducer/courtSlices/courtSizeSlice";
import courtNameReducer from "./reducer/courtNameSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      courtSize: courtReducer,
      courtName: courtNameReducer,
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
