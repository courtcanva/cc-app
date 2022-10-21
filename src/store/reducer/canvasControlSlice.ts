import { ZOOM_STEP_SIZE } from "@/constants/zoomLimit";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface canvasState {
  zoomScale: number;
  dragActivate: boolean; // enable the drag action
  dragStart: boolean; // Track the start of user drag action
  resetState: boolean;
  screenshot: string | null;
}

export const initialState: canvasState = {
  zoomScale: 1,
  dragActivate: false,
  dragStart: false,
  resetState: false,
  screenshot: null,
};

export const canvasControlSlice = createSlice({
  name: "canvasControl",
  initialState,
  reducers: {
    changeZoomScale: (state: canvasState, action: PayloadAction<boolean>) => {
      action.payload ? (state.zoomScale += ZOOM_STEP_SIZE) : (state.zoomScale -= ZOOM_STEP_SIZE);
    }, // Payload: true -> Zoom in, false -> Zoom out
    dragSwitch: (state: canvasState, action: PayloadAction<boolean>) => {
      state.dragActivate = action.payload;
    },
    dragState: (state: canvasState, action: PayloadAction<boolean>) => {
      state.dragStart = action.payload;
    },
    resetAll: (state: canvasState) => {
      state.zoomScale = 1;
      state.dragActivate = false;
      state.dragStart = false;
      state.resetState = !state.resetState;
    },
    setScreenshot: (state: canvasState, action: PayloadAction<string>) => {
      state.screenshot = action.payload;
    },
  },
});

export const { changeZoomScale, dragSwitch, dragState, resetAll, setScreenshot } =
  canvasControlSlice.actions;

export default canvasControlSlice.reducer;
