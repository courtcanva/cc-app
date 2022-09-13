import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DesignNameState {
  nameList: string[];
}

export const initialState: DesignNameState = {
  nameList: [],
};

export const designNameSlice = createSlice({
  name: "DesignName",
  initialState,
  reducers: {
    changeDesignNameList: (state: DesignNameState, action: PayloadAction<string[]>) => {
      return { ...state, nameList: action.payload };
    },
    deleteNameFromList: (state: DesignNameState, action: PayloadAction<string>) => {
      const deleteName = state.nameList.filter(function (names) {
        return names !== action.payload;
      });
      state.nameList = deleteName;
    },
  },
});

export const { changeDesignNameList, deleteNameFromList } = designNameSlice.actions;

export default designNameSlice.reducer;
