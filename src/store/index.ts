import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userReducer from "./reducer/userSlice";
import tileReducer from "./reducer/tileSlice";
import courtColorReducer from "./reducer/courtColorSlice";
import buttonToggleReducer from "./reducer/buttonToggleSlice";
import { courtsApi } from "@/redux/api/courtSizeApi";
import { priceApi } from "@/redux/api/priceApi";
import { designApi } from "@/redux/api/designApi";
import { courtColorApi } from "@/redux/api/courtColorAPi";
import { cartApi } from "@/redux/api/cartApi";
import designNameReducer from "./reducer/designNameSlice";
import priceBarReducer from "./reducer/priceBarSlice";
import areaTileQtyReducer from "./reducer/areaTileQtySlice";
import courtSpecDataReducer from "./reducer/courtSpecDataSlice";
import designTileListReducer from "./reducer/designsTileListSlice";
import colorListReducer from "./reducer/colorListSlice";
import canvasControlReducer from "./reducer/canvasControlSlice";
import { templateApi } from "@/redux/api/templateApi";

export const makeStore = () =>
  configureStore({
    reducer: {
      tile: tileReducer,
      priceBar: priceBarReducer,
      courtColor: courtColorReducer,
      user: userReducer,
      buttonToggle: buttonToggleReducer,
      designName: designNameReducer,
      designTileList: designTileListReducer,
      courtSpecData: courtSpecDataReducer,
      [courtsApi.reducerPath]: courtsApi.reducer,
      [priceApi.reducerPath]: priceApi.reducer,
      [designApi.reducerPath]: designApi.reducer,
      [courtColorApi.reducerPath]: courtColorApi.reducer,
      [cartApi.reducerPath]: cartApi.reducer,
      [templateApi.reducerPath]: templateApi.reducer,
      areaTileQty: areaTileQtyReducer,
      colorList: colorListReducer,
      canvasControl: canvasControlReducer,
    },

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        courtsApi.middleware,
        priceApi.middleware,
        designApi.middleware,
        courtColorApi.middleware,
        cartApi.middleware,
        templateApi.middleware
      ),
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
