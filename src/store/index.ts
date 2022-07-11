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
<<<<<<< HEAD
import priceBarSlice from "./reducer/priceBarSlice";
||||||| parent of 83e0546 (feat: cc-0088 price change and courtData env)
=======
import totalPriceReducer from "./reducer/totalPriceSlice";
>>>>>>> 83e0546 (feat: cc-0088 price change and courtData env)

export const makeStore = () =>
  configureStore({
    reducer: {
      courtSize: courtReducer,
      courtName: courtNameReducer,
      tile: tileReducer,
      priceBar: priceBarSlice,
      courtColor: courtColorReducer,
      user: userReducer,
      rulerControl: rulerControlReducer,
      designName: designNameReducer,
      paintBucket: paintBucketReducer,
      totalPrice: totalPriceReducer,
      [courtsApi.reducerPath]: courtsApi.reducer,
      [priceApi.reducerPath]: priceApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(courtsApi.middleware),
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
