import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import threePointLineReducer from "./reducer/courtSlices/threePointLineSlice";
import keyAreaReducer from "./reducer/courtSlices/keyAreaSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      threePointLine: threePointLineReducer,
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
