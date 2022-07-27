import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DesignNameState {
  nameList: string[];
}

export const initialState: DesignNameState = {
  nameList: ["Court Canva 1"],
};

export const designNameSlice = createSlice({
  name: "DesignName",
  initialState,
  reducers: {
    changeDesignNameList: (state: DesignNameState, action: PayloadAction<string[]>) => {
      return { ...state, nameList: action.payload };
    },
    addDesignNameList: (state: DesignNameState, action: PayloadAction<string>) => {
      state.nameList.push(action.payload);
    },
  },
});

export const { changeDesignNameList, addDesignNameList } = designNameSlice.actions;

export default designNameSlice.reducer;
