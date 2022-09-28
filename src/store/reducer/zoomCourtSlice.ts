import { ZOOM_STEP_SIZE } from "@/constants/zoomLimit";
import { createSlice } from "@reduxjs/toolkit";

export interface ZoomState {
  zoomScale: number;
}

export const initialState: ZoomState = {
  zoomScale: 1,
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
    resetZoom: (state: ZoomState) => {
      state.zoomScale = 1;
    },
  },
});

export const { zoomIn, zoomOut, resetZoom } = ZoomControlSlice.actions;

export default ZoomControlSlice.reducer;
