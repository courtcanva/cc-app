import { mockTileData } from "@/components/MockData/MockTileData";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

export interface AreaTileQty {
  location: string;
  quantity: number;
}

export const initialState = mockTileData.find((obj) => obj.name === "Pro Full Court")
  ?.tileQty as AreaTileQty[];

export const areaTileQtySlice = createSlice({
  name: "areaTileQty",
  initialState,
  reducers: {
    changeCourtType: (state, action: PayloadAction<AreaTileQty[]>) => {
      return action.payload;
    },
    updateBorderTileQty: (state, action: PayloadAction<number>) => {
      state[5].quantity = action.payload;
      return state;
    },
  },
});

export const { changeCourtType, updateBorderTileQty } = areaTileQtySlice.actions;

export const areaTileQtyData = (state: RootState) => state.areaTileQty;

export default areaTileQtySlice.reducer;
