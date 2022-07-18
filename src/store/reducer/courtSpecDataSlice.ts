import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "..";
import { CourtSizeState, CourtSpecMapper } from "./courtSizeSlice";
import { courtSpecMapping } from "../../utils/courtSpecMapping";

export interface CourtSpec {
  courtsData: CourtSizeState[];
  activeCourt: CourtSizeState;
  isLoading: boolean;
  isError: string;
}

export const initialState: CourtSpec = {
  courtsData: [],
  activeCourt: {
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
  },
  isLoading: true,
  isError: "",
};

export const Slice = createSlice({
  name: "courtSpecData",
  initialState,
  reducers: {
    getCourtSpecData: (state, action: PayloadAction<CourtSizeState[]>) => {
      state.courtsData = [...action.payload];
      return state;
    },
    setActiveCourt: (state, action: PayloadAction<string>) => {
      const index = state.courtsData.findIndex((item) => item.courtName === action.payload);
      state.activeCourt = state.courtsData[index];
      return state;
    },
  },
});

export const { getCourtSpecData, setActiveCourt } = Slice.actions;
export const courtSpecData = (state: RootState) => state.courtSpecData;

export default Slice.reducer;
