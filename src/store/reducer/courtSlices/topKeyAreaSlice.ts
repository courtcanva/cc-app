import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../..";

export interface TopKeyAreaState {
  startPointX: number;
  startPointY: number;
  innerRadius: number;
  outerRadius: number;
  angle: number;
  strokeWidth: number;
  rotation: number;
  dash?: number[];
}

export const initialState: TopKeyAreaState = {
  startPointX: 87.9,
  startPointY: 200,
  innerRadius: 0,
  outerRadius: 15,
  angle: 180,
  strokeWidth: 0.5,
  rotation: 90,
  dash: [1, 1],
};

export const topKeyAreaSlice = createSlice({
  name: "topKeyArea",
  initialState,
  reducers: {
    changeStartPoint: (state: TopKeyAreaState, action: PayloadAction) => {
      // TODO:state.startPointX = action.payload;
      // TODO:state.startPointY = action.payload;
    },
  },
});

export const { changeStartPoint } = topKeyAreaSlice.actions;

export const topKeyAreaData = (state: RootState) => state.topKeyArea;

export default topKeyAreaSlice.reducer;
