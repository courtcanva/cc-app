import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../..";

export interface BorderState {
  [prop: string]: number;
}

export const initialState: BorderState = {
  startPointX: 10,
  startPointY: 105,
  borderXLength: 160,
  borderYLength: 190,
};

export const BorderSlice = createSlice({
  name: "border",
  initialState,
  reducers: {
    changeStartPoint: (state: BorderState, action: PayloadAction) => {
      // TODO:state.startPointX = action.payload;
      // TODO:state.startPointY = action.payload;
    },
  },
});

export const { changeStartPoint } = BorderSlice.actions;

export const BorderData = (state: RootState) => state.border;

export default BorderSlice.reducer;
