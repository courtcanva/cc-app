import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Court } from "./tileSlice";

export interface DesignTileListState {
  designTileList: DesignTileList[];
}
export interface DesignTileList {
  courtId: string;
  tileColor: Court[];
}

export interface DesignTileList {
  courtId: string;
  tileColor: Court[];
}

export const initialState: DesignTileListState = {
  designTileList: [],
};

export const designsTileListSlice = createSlice({
  name: "designsTileList",
  initialState,
  reducers: {
    getDesignsTileData: (state, action: PayloadAction<DesignTileList[]>) => {
      state.designTileList = [...action.payload];
      return state;
    },
  },
});

export const { getDesignsTileData } = designsTileListSlice.actions;

export default designsTileListSlice.reducer;
