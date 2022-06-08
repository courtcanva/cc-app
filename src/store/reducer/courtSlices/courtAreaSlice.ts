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
  //   controlPointOneX: 111.75,
  //   controlPointOneY: 134,
  //   controlPointTwoX: 111.75,
  //   controlPointTwoY: 200,
  //   controlPointThreeX: 111.75,
  //   controlPointThreeY: 266,
  //   controlPointFourX: 45.7,
  //   controlPointFourY: 266,
  //   courtAreaRadius: 66,
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
