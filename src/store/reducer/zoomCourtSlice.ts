import { MAX_ZOOM, MIN_ZOOM, ZOOM_STEP_SIZE } from "@/constants/zoomLimit";
import { createSlice } from "@reduxjs/toolkit";

interface ZoomState {
  zoomScale: number;
  zoomStep: number;
  minScale: number;
  maxScale: number;
}

const initialState: ZoomState = {
  zoomScale: 1,
  zoomStep: 0,
  minScale: MIN_ZOOM,
  maxScale: MAX_ZOOM,
};

export const ZoomControlSlice = createSlice({
  name: "ZoomControl",
  initialState,
  reducers: {
    zoomIn: (state: ZoomState) => {
      state.zoomStep++;
      state.zoomScale = 1 + ZOOM_STEP_SIZE * state.zoomStep;
    },
    zoomOut: (state: ZoomState) => {
      state.zoomStep--;
      state.zoomScale = 1 + ZOOM_STEP_SIZE * state.zoomStep;
    },
    reset: (state: ZoomState) => {
      state.zoomScale = 1;
      state.zoomStep = 0;
    },
  },
});

export const { zoomIn, zoomOut, reset } = ZoomControlSlice.actions;

export default ZoomControlSlice.reducer;
