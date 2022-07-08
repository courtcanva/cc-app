import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PaintBucketState {
  paintPopover: boolean;
}

export const initialState: PaintBucketState = {
  paintPopover: false,
};

export const paintBucketSlice = createSlice({
  name: "PaintBucket",
  initialState,
  reducers: {
    usePaintBucket: (state: PaintBucketState, action: PayloadAction<boolean>) => {
      return {
        ...state,
        paintPopover: action.payload,
      };
    },
  },
});

export const { usePaintBucket } = paintBucketSlice.actions;

export default paintBucketSlice.reducer;
