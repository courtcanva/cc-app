import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import courtAreaReducer from "./reducer/courtSlices/courtAreaSlice";
import threePointLineReducer from "./reducer/courtSlices/threePointLineSlice";
import keyAreaReducer from "./reducer/courtSlices/keyAreaSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      threePointLine: threePointLineReducer,
      courtArea: courtAreaReducer,
      keyArea: keyAreaReducer,
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
