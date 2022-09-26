import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ZoomState {
  zoomScale: Number;
}

const initialState: ZoomState = {
  zoomScale: 1,
};

export const ZoomControlSlice = createSlice({
  name: "ZoomControl",
  initialState,
  reducers: {
    zoomIn: (state: ZoomState) => {
      state.zoomScale = state.zoomScale.valueOf() + 0.2;
    },
    zoomOut: (state: ZoomState) => {
      state.zoomScale = state.zoomScale.valueOf() - 0.2;
    },
  },
});

export const { zoomIn, zoomOut } = ZoomControlSlice.actions;

export default ZoomControlSlice.reducer;
