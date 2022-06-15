import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import courtAreaReducer from "./reducer/courtSlices/courtAreaSlice";
import threePointLineReducer from "./reducer/courtSlices/threePointLineSlice";
import borderReducer from "./reducer/courtSlices/borderSlice";
import keyAreaReducer from "./reducer/courtSlices/keyAreaSlice";
import circleAreaReducer from "./reducer/courtSlices/circleAreaSlice";
import topKeyAreaReducer from "./reducer/courtSlices/topKeyAreaSlice";
import CourtNameReducer from "./reducer/courtNameSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      threePointLine: threePointLineReducer,
      courtArea: courtAreaReducer,
      border: borderReducer,
      keyArea: keyAreaReducer,
      circleArea: circleAreaReducer,
      topKeyArea: topKeyAreaReducer,
      courtName: CourtNameReducer,
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
