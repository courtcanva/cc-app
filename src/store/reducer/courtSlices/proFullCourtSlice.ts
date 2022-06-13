import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../..";

export interface ProFullCourtState {
  [prop: string]: number;
}

export const initialState: ProFullCourtState = {
  initPointX: 50,
  initPointY: 100,
  courtAreaXLength: 140,
  courtAreaYLength: 150,
  threePointLineToCourtEdgeLenth: 9,
  cornerThreePointLineLength: 15.75,
  threePointLineRadius: 66,
  keyAreaWidth: 57.9,
  keyAreaHeight: 48,
  circleRadius: 18,
  strokeWidth: 2,
  bordeLength: 20,
};

export const proFullCourtSlice = createSlice({
  name: "proFullCourt",
  initialState,
  reducers: {
    changeStartPoint: (state: ProFullCourtState, action: PayloadAction) => {
      // TODO:state.startPointX = action.payload;
      // TODO:state.startPointY = action.payload;
    },
  },
});

export const { changeStartPoint } = proFullCourtSlice.actions;

export const proFullCourtData = (state: RootState) => state.proFullCourt;

export default proFullCourtSlice.reducer;
