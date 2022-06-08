import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../..";

export interface KeyAreaState {
  [prop: string]: number;
}

export const initialState: KeyAreaState = {
  startPointX: 30,
  startPointY: 185,
  width: 50,
  height: 30,
};

export const keyAreaSlice = createSlice({
  name: "keyArea",
  initialState,
  reducers: {
    changeStartPoint: (state: KeyAreaState, action: PayloadAction) => {
      // TODO:state.startPointX = action.payload;
      // TODO:state.startPointY = action.payload;
    },
  },
});

export const { changeStartPoint } = keyAreaSlice.actions;

export const keyAreaData = (state: RootState) => state.keyArea;

export default keyAreaSlice.reducer;
