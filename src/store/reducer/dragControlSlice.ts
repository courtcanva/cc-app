import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DragControlState {
  dragActivate: boolean;
  dragStart: boolean;
}

export const initialState: DragControlState = {
  dragActivate: false,
  dragStart: false,
};

export const dragControlSlice = createSlice({
  name: "DragControl",
  initialState,
  reducers: {
    dragSwitch: (state: DragControlState, action: PayloadAction<boolean>) => {
      state.dragActivate = action.payload;
    },
    dragState: (state: DragControlState, action: PayloadAction<boolean>) => {
      state.dragStart = action.payload;
    },
  },
});

export const { dragSwitch, dragState } = dragControlSlice.actions;
export default dragControlSlice.reducer;
