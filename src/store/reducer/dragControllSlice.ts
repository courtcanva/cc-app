import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DragControl {
  dragState: boolean;
}

export const initialState: DragControl = {
  dragState: false,
};

export const dragControlSlice = createSlice({
  name: "DragControl",
  initialState,
  reducers: {
    useDrag: (state: DragControl, action: PayloadAction<boolean>) => {
      return {
        ...state,
        draggable: action.payload,
      };
    },
  },
});

export const { useDrag } = dragControlSlice.actions;
export default dragControlSlice.reducer;
