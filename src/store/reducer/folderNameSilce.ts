import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FolderNameState {
  name: string;
}

export const initialState: FolderNameState = {
  name: "FOLDER SAVED 510 ㎡ Pro Court (17 m * 30 m)",
};

export const FolderNameSlice = createSlice({
  name: "FolderName",
  initialState,
  reducers: {
    changeFolderName: (state: FolderNameState, action: PayloadAction<string>) => {
      return { ...state, name: action.payload };
    },
  },
});

export const { changeFolderName } = FolderNameSlice.actions;

export default FolderNameSlice.reducer;
