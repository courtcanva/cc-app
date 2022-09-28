import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DragControlState {
  dragState: boolean;
}

export const initialState: DragControlState = {
  dragState: false,
};

export const dragControlSlice = createSlice({
  name: "DragControl",
  initialState,
  reducers: {
    useDrag: (state: DragControlState, action: PayloadAction<boolean>) => {
      return {
        ...state,
        dragState: action.payload,
      };
    },
  },
});

export const { useDrag } = dragControlSlice.actions;
export default dragControlSlice.reducer;
