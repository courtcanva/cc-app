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
  customizeCourtAreaXLength?: number;
  customizeCourtAreaYLength?: number;
  designName: string;
}
export interface CourtSpecMapper {
  [prop: string]: string;
}

export interface CourtSpec {
  courtsData: CourtSizeState[];
  designsData: CourtSizeState[];
  activeCourt: CourtSizeState;
  isLoading: boolean;
  isError: string;
}

export const initialState: CourtSpec = {
  courtsData: [],
  designsData: [],
  activeCourt: {
    courtId: "",
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
    customizeCourtAreaXLength: undefined,
    customizeCourtAreaYLength: undefined,
    designName: "Court Canva 1",
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
    getDesignsData: (state, action: PayloadAction<CourtSizeState[]>) => {
      state.designsData = [...action.payload];
      return state;
    },
    setActiveCourt: (state: CourtSpec, action: PayloadAction<string>) => {
      const index = state.courtsData.findIndex((item) => item.courtName === action.payload);
      state.activeCourt = state.courtsData[index];
      return state;
    },
    updateBorderLength: (state: CourtSpec, action: PayloadAction<number>) => {
      state.activeCourt = { ...state.activeCourt, borderLength: action.payload };
      return state;
    },
    setNewCourtAreaXLength: (state: CourtSpec, action?: PayloadAction<number>) => {
      state.activeCourt = { ...state.activeCourt, customizeCourtAreaXLength: action?.payload };
      return state;
    },
    setNewCourtAreaYLength: (state: CourtSpec, action?: PayloadAction<number>) => {
      state.activeCourt = { ...state.activeCourt, customizeCourtAreaYLength: action?.payload };
      return state;
    },
    setActiveDesign: (state, action: PayloadAction<string>) => {
      const index = state.designsData.findIndex((item) => item.courtId === action.payload);
      state.activeCourt = state.designsData[index];
      return state;
    },
    setNewDesignActive: (state, action: PayloadAction<string>) => {
      const index = state.designsData.findIndex((item) => item.designName === action.payload);
      state.activeCourt = state.designsData[index];
      return state;
    },
    changeDesignName: (state: CourtSpec, action: PayloadAction<string>) => {
      state.activeCourt = { ...state.activeCourt, designName: action.payload };
      return state;
    },
    setDefaultCourt: (state: CourtSpec, action: PayloadAction<CourtSizeState>) => {
      state.activeCourt = action.payload;
      return state;
    },
  },
});

export const {
  getCourtSpecData,
  getDesignsData,
  setActiveCourt,
  updateBorderLength,
  setNewCourtAreaXLength,
  setNewCourtAreaYLength,
  setActiveDesign,
  setNewDesignActive,
  changeDesignName,
  setDefaultCourt,
} = Slice.actions;
export const courtWhiteLine = initialState.activeCourt.strokeWidth / 3;
export const dashedWhiteLine = initialState.activeCourt.strokeWidth / 5;

export const defaultCourt = initialState.activeCourt;
export const courtSpecData = (state: RootState) => state.courtSpecData;
export const getCourtNameString = (activeCourt: CourtSizeState) => {
  const { courtAreaXLength, courtAreaYLength, courtName } = activeCourt;
  let courtLength = 0;
  let courtWidth = 0;
  let courtArea = 0;
  if (courtName === "Pro Full Court") {
    courtLength = (courtAreaXLength + 1000 * 2) / 1000;
    courtWidth = (courtAreaYLength + 1000 * 2) / 1000;
  } else {
    courtLength = courtAreaXLength / 1000;
    courtWidth = courtAreaYLength / 1000;
  }
  courtArea = courtLength * courtWidth;

  const name = `${courtArea} m² ${courtName} ( ${courtLength} m × ${courtWidth} m)`;

  return name;
};

export default Slice.reducer;
