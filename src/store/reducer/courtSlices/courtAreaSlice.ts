import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../..";

export interface CourtAreaState {
  [prop: string]: number;
}

export const initialState: CourtAreaState = {
  startPointX: 30,
  startPointY: 125,
  courtAreaXLength: 140,
  courtAreaYLength: 150,
};

export const courtAreaSlice = createSlice({
  name: "courtArea",
  initialState,
  reducers: {
    changeStartPoint: (state: CourtAreaState, action: PayloadAction) => {
      // TODO:state.startPointX = action.payload;
      // TODO:state.startPointY = action.payload;
    },
  },
});

export const { changeStartPoint } = courtAreaSlice.actions;

export const courtAreaData = (state: RootState) => state.courtArea;

export default courtAreaSlice.reducer;
