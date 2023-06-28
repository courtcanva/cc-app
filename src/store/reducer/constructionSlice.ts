import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface ConstructionState {
  constructionSrc: string | null;
  constructionPdfSrc: string | null;
  constructionInfo: ConstructionInfo;
}

export interface ConstructionInfo {
  beginPointX: number;
  beginPointY: number;
  endPointX: number;
  endPointY: number;
  tileSize: number;
}

export const initialState: ConstructionState = {
  constructionSrc: null,
  constructionPdfSrc: null,
  constructionInfo: {
    beginPointX: 0,
    beginPointY: 0,
    endPointX: 0,
    endPointY: 0,
    tileSize: 0,
  },
};

export const ConstructionSlice = createSlice({
  name: "Construction",
  initialState,
  reducers: {
    changeConstructionSrc: (state: ConstructionState, action: PayloadAction<string>) => {
      return {
        ...state,
        constructionSrc: action.payload,
      };
    },
    changeConstructionPdfSrc: (state: ConstructionState, action: PayloadAction<string>) => {
      return {
        ...state,
        constructionSrc: action.payload,
      };
    },
    changeConstructionInfo: (state: ConstructionState, action: PayloadAction<ConstructionInfo>) => {
      return {
        ...state,
        constructionInfo: action.payload,
      };
    },
  },
});

export const { changeConstructionSrc, changeConstructionPdfSrc, changeConstructionInfo } =
  ConstructionSlice.actions;

export default ConstructionSlice.reducer;
