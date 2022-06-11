import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../..";

export interface CircleAreaState {
  [prop: string]: number;
}

export const initialState: CircleAreaState = {
  startPointX: 170,
  startPointY: 185,
  circleAreaRadius: 15,
};

export const circleAreaSlice = createSlice({
  name: "circleArea",
  initialState,
  reducers: {
    changeStartPoint: (state: CircleAreaState, action: PayloadAction) => {
      // TODO:state.startPointX = action.payload;
      // TODO:state.startPointY = action.payload;
    },
  },
});

export const { changeStartPoint } = circleAreaSlice.actions;

export const circleAreaData = (state: RootState) => state.circleArea;

export default circleAreaSlice.reducer;
