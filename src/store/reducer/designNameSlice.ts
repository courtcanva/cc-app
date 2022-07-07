import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DesignNameState {
  name: string;
}

export const initialState: DesignNameState = {
  name: "Court Canva 1",
};

export const designNameSlice = createSlice({
  name: "DesignName",
  initialState,
  reducers: {
    changeDesignName: (state: DesignNameState, action: PayloadAction<string>) => {
      return { ...state, name: action.payload };
    },
  },
});

export const { changeDesignName } = designNameSlice.actions;

export default designNameSlice.reducer;
