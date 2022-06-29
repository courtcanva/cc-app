import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CourtColorState {
  selectedColor: string;
  courtAreaColor: string;
  borderColor: string;
  circleAreaColor: string;
  keyAreaColor: string;
  threePointAreaColor: string;
  topKeyAreaColor: string;
}

export const initialState: CourtColorState = {
  selectedColor: "",
  courtAreaColor: "#B61313",
  borderColor: "#195955",
  circleAreaColor: "#606F14",
  keyAreaColor: "#2C4E8A",
  threePointAreaColor: "#72818B",
  topKeyAreaColor: "#B61313",
};

export const CourtColorSlice = createSlice({
  name: "CourtColor",
  initialState,
  reducers: {
    changeSelectedColor: (state: CourtColorState, action: PayloadAction<string>) => {
      return {
        ...state,
        selectedColor: action.payload,
      };
    },
    setCourtAreaColor: (state: CourtColorState, action: PayloadAction<string>) => {
      return {
        ...state,
        courtAreaColor: action.payload,
      };
    },
    setBorderColor: (state: CourtColorState, action: PayloadAction<string>) => {
      return {
        ...state,
        borderColor: action.payload,
      };
    },
    setCircleAreaColor: (state: CourtColorState, action: PayloadAction<string>) => {
      return {
        ...state,
        circleAreaColor: action.payload,
      };
    },
    setKeyAreaColor: (state: CourtColorState, action: PayloadAction<string>) => {
      return {
        ...state,
        keyAreaColor: action.payload,
      };
    },
    setThreePointAreaColor: (state: CourtColorState, action: PayloadAction<string>) => {
      return {
        ...state,
        threePointAreaColor: action.payload,
      };
    },
    setTopKeyAreaColor: (state: CourtColorState, action: PayloadAction<string>) => {
      return {
        ...state,
        topKeyAreaColor: action.payload,
      };
    },
  },
});

export const {
  changeSelectedColor,
  setCourtAreaColor,
  setBorderColor,
  setCircleAreaColor,
  setKeyAreaColor,
  setThreePointAreaColor,
  setTopKeyAreaColor,
} = CourtColorSlice.actions;

export default CourtColorSlice.reducer;
