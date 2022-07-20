import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import courtReducer from "./reducer/courtSizeSlice";
import courtNameReducer from "./reducer/courtNameSlice";
import userReducer from "./reducer/userSlice";
import tileReducer from "./reducer/tileSlice";
import courtColorReducer from "./reducer/courtColorSlice";
import rulerControlReducer from "./reducer/rulerControlSlice";
import { courtsApi } from "../redux/api/courtSizeApi";
import { priceApi } from "../redux/api/priceApi";
import designNameReducer from "./reducer/designNameSlice";
import paintBucketReducer from "./reducer/paintBucketSlice";
import priceBarReducer from "./reducer/priceBarSlice";
import areaTileQtyReducer from "./reducer/areaTileQtySlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      courtSize: courtReducer,
      courtName: courtNameReducer,
      tile: tileReducer,
      priceBar: priceBarReducer,
      courtColor: courtColorReducer,
      user: userReducer,
      rulerControl: rulerControlReducer,
      designName: designNameReducer,
      paintBucket: paintBucketReducer,
      [courtsApi.reducerPath]: courtsApi.reducer,
      [priceApi.reducerPath]: priceApi.reducer,
      areaTileQty: areaTileQtyReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(courtsApi.middleware, priceApi.middleware),
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
