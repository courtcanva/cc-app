import { MAX_ZOOM, MIN_ZOOM, ZOOM_STEP_SIZE } from "@/constants/zoomLimit";
import { createSlice } from "@reduxjs/toolkit";

interface ZoomState {
  zoomScale: number;
  minScale: number;
  maxScale: number;
}

const initialState: ZoomState = {
  zoomScale: 1,
  minScale: MIN_ZOOM,
  maxScale: MAX_ZOOM,
};

export const ZoomControlSlice = createSlice({
  name: "ZoomControl",
  initialState,
  reducers: {
    zoomIn: (state: ZoomState) => {
      state.zoomScale = state.zoomScale * ZOOM_STEP_SIZE;
    },
    zoomOut: (state: ZoomState) => {
      state.zoomScale = state.zoomScale / ZOOM_STEP_SIZE;
    },
    reset: (state: ZoomState) => {
      state.zoomScale = 1;
    },
  },
});

export const { zoomIn, zoomOut, reset } = ZoomControlSlice.actions;

export default ZoomControlSlice.reducer;
