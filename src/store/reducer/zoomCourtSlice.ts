import { ZOOM_STEP_SIZE } from "@/constants/zoomLimit";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ZoomState {
  zoomScale: number;
  resetState: boolean;
}

export const initialState: ZoomState = {
  zoomScale: 1,
  resetState: false,
};

export const ZoomControlSlice = createSlice({
  name: "ZoomControl",
  initialState,
  reducers: {
    zoomIn: (state: ZoomState) => {
      state.zoomScale += ZOOM_STEP_SIZE;
    },
    zoomOut: (state: ZoomState) => {
      state.zoomScale -= ZOOM_STEP_SIZE;
    },
    resetZoomScale: (state: ZoomState) => {
      state.zoomScale = 1;
    },
    resetZoomState: (state: ZoomState) => {
      state.resetState = !state.resetState;
    },
  },
});

export const { zoomIn, zoomOut, resetZoomScale, resetZoomState } = ZoomControlSlice.actions;

export default ZoomControlSlice.reducer;
