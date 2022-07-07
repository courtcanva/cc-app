import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import courtReducer from "./reducer/courtSizeSlice";
import courtNameReducer from "./reducer/courtNameSlice";
import userReducer from "./reducer/userSlice";
import tileReducer from "./reducer/tileSlice";
import courtColorReducer from "./reducer/courtColorSlice";
import rulerControlReducer from "./reducer/rulerControlSlice";
import strokeColorReducer from "./reducer/strokeColorSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      courtSize: courtReducer,
      courtName: courtNameReducer,
      tile: tileReducer,
      courtColor: courtColorReducer,
      user: userReducer,
      rulerControl: rulerControlReducer,
      strokeColor: strokeColorReducer,
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
