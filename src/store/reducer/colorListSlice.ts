import { ITileColor } from "@/interfaces/color";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ColorListState {
  colorList: ITileColor[];
}

export const initialState: ColorListState = {
  colorList: [],
};

export const colorListSlice = createSlice({
  name: "colorList",
  initialState,
  reducers: {
    getColorList: (state: ColorListState, action: PayloadAction<ITileColor[]>) => {
      return {
        ...state,
        colorList: action.payload,
      };
    },
  },
});

export const { getColorList } = colorListSlice.actions;

export default colorListSlice.reducer;
