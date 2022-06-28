<<<<<<< HEAD
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CourtColorState {
  color: string;
}

export const initialState: CourtColorState = {
  color: "#80C4E5",
};

export const CourtColorSlice = createSlice({
  name: "CourtColor",
  initialState,
  reducers: {
    changeCourtColor: (state: CourtColorState, action: PayloadAction<string>) => {
      return {
        ...state,
        color: action.payload,
      };
    },
  },
});

export const { changeCourtColor } = CourtColorSlice.actions;

export default CourtColorSlice.reducer;
||||||| parent of 7e077be (feat: cc-0067 interact color icon)
=======
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CourtColorState {
  color: string;
}

export const initialState: CourtColorState = {
  color: "#80C4E5",
};

export const CourtColorSlice = createSlice({
  name: "CourtColor",
  initialState,
  reducers: {
    changeCourtColor: (state: CourtColorState, action: PayloadAction<string>) => {
      return {
        ...state,
        color: action.payload,
      };
    },
  },
});

export const { changeCourtColor } = CourtColorSlice.actions;

export default CourtColorSlice.reducer;
>>>>>>> 7e077be (feat: cc-0067 interact color icon)
