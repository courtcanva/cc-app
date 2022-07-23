import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DesignNameState {
  nameList: string[];
}

export const initialState: DesignNameState = {
  nameList: [ "Court Canva 1" ],
};

export const designNameSlice = createSlice({
  name: "DesignName",
  initialState,
  reducers: {
    changeDesignNames: (state: DesignNameState, action: PayloadAction<string[]>) => {
      return { ...state, nameList: action.payload };
    },
    addDesignNames: (state: DesignNameState, action: PayloadAction<string>) => {
          state.nameList.push(action.payload)
    },
  },
});

export const { changeDesignNames, addDesignNames } = designNameSlice.actions;

export default designNameSlice.reducer;
