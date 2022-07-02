import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface RulerControlState {
  ruler: boolean;
}

export const initialState: RulerControlState = {
  ruler: true,
};

export const rulerControlSlice = createSlice({
  name: "RulerControl",
  initialState,
  reducers: {
    switchRuler: (state: RulerControlState, action: PayloadAction<boolean>) => {
      return {
        ...state,
        ruler: action.payload,
      };
    },
  },
});

export const { switchRuler } = rulerControlSlice.actions;

export default rulerControlSlice.reducer;
