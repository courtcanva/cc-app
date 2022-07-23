import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
export interface CourtSizeState {
  courtId: string;
  courtName: string;
  courtAreaXLength: number;
  courtAreaYLength: number;
  threePointLineToCourtEdgeLength: number;
  cornerThreePointLineLength: number;
  threePointLineRadius: number;
  keyAreaWidth: number;
  keyAreaHeight: number;
  circleRadius: number;
  strokeWidth: number;
  borderLength: number;
  designName: string;
}
export interface CourtSpecMapper {
  [prop: string]: string;
}

export const initialState: CourtSizeState = {
  courtId: "62c432cfb8a9c5f61f03831f",
  courtName: "Pro Full Court",
  courtAreaXLength: 28000,
  courtAreaYLength: 15000,
  threePointLineToCourtEdgeLength: 900,
  cornerThreePointLineLength: 1575,
  threePointLineRadius: 6600,
  keyAreaWidth: 5790,
  keyAreaHeight: 4800,
  circleRadius: 1800,
  strokeWidth: 200,
  borderLength: 1000,
  designName: "Court Canva 1",
};

export const courtSizeSlice = createSlice({
  name: "courtSize",
  initialState,
  reducers: {
    changeCourtSize: (state: CourtSizeState, action: PayloadAction<CourtSizeState>) => {
      return { ...state, ...action.payload };
    },
    changeBorderLength: (state: CourtSizeState, action: PayloadAction<number>) => {
      return { ...state, borderLength: action.payload };
    },
    changeDesignName: (state: CourtSizeState, action: PayloadAction<string>) => {
      return { ...state, designName: action.payload };
    },
  },
});

// export const borderSize = (state: CourtSizeState) =>
//   state.borderLength < MIN_DIMENSION_BOX ? MIN_DIMENSION_BOX : initialState.borderLength;
export const courtWhiteLine = initialState.strokeWidth / 3;
export const dashedWhiteLine = initialState.strokeWidth / 5;
// export const borderLength = initialState.borderLength;

export const { changeCourtSize, changeBorderLength, changeDesignName } = courtSizeSlice.actions;

export default courtSizeSlice.reducer;
