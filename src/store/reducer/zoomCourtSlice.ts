import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ZoomState {
  zoomScale: number;
  minScale: number;
  maxScale: number;
}

const initialState: ZoomState = {
  zoomScale: 1,
  minScale: 1,
  maxScale: 1.5,
};

export const ZoomControlSlice = createSlice({
  name: "ZoomControl",
  initialState,
  reducers: {
    zoomIn: (state: ZoomState) => {
      state.zoomScale = state.zoomScale * 1.1;
    },
    zoomOut: (state: ZoomState) => {
      state.zoomScale = state.zoomScale / 1.1;
    },
  },
});

export const { zoomIn, zoomOut } = ZoomControlSlice.actions;

export default ZoomControlSlice.reducer;
