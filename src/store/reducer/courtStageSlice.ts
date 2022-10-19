import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CourtStageState {
  screenshot: string | null;
}

export const initialState: CourtStageState = {
  screenshot: null,
};

export const CourtStageSlice = createSlice({
  name: "activeCourtStage",
  initialState,
  reducers: {
    setScreenshot: (state: CourtStageState, action: PayloadAction<string>) => {
      return {
        ...state,
        screenshot: action.payload,
      };
    },
  },
});

export const { setScreenshot } = CourtStageSlice.actions;

export default CourtStageSlice.reducer;
