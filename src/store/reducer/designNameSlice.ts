import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DesignNameState {
  nameList: Name[];
}

export interface Name {
  name: string
}

export const initialState: DesignNameState = {
  nameList: [{ name: "" }],
};

export const designNameSlice = createSlice({
  name: "DesignName",
  initialState,
  reducers: {
    changeDesignNames: (state: DesignNameState, action: PayloadAction<Name[]>) => {
      return { ...state, nameList: action.payload };
    },
  },
});

export const { changeDesignNames } = designNameSlice.actions;

export default designNameSlice.reducer;
