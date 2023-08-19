import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDesign } from "@/interfaces/design";
export interface ConstructionState {
  constructionSrc: string | null;
  constructionInfo: ConstructionInfo;
  courtDesign: IDesign | null;
  courtSrc: string | null;
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
  constructionInfo: {
    beginPointX: 0,
    beginPointY: 0,
    endPointX: 0,
    endPointY: 0,
    tileSize: 0,
  },
  courtDesign: null,
  courtSrc: null,
};

export const ConstructionSlice = createSlice({
  name: "Construction",
  initialState,
  reducers: {
    changeConstructionSrc: (state: ConstructionState, action: PayloadAction<string | null>) => {
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
    changeCourtDesign: (state: ConstructionState, action: PayloadAction<IDesign | null>) => {
      return {
        ...state,
        courtDesign: action.payload,
      };
    },
    changeCourtSrc: (state: ConstructionState, action: PayloadAction<string | null>) => {
      return {
        ...state,
        courtSrc: action.payload,
      };
    },
  },
});

export const { changeConstructionSrc, changeConstructionInfo, changeCourtDesign, changeCourtSrc } =
  ConstructionSlice.actions;

export default ConstructionSlice.reducer;
