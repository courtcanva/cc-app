import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DesignPageButtonState {
  ruler: boolean;
  isCartOpen: boolean;
  paintPopover: boolean;
  sideBar: boolean;
}

export const initialState: DesignPageButtonState = {
  ruler: true,
  isCartOpen: false,
  paintPopover: false,
  sideBar: false,
};

export const DesignPageButtonSlice = createSlice({
  name: "DesignPageButton",
  initialState,
  reducers: {
    switchRuler: (state: DesignPageButtonState, action: PayloadAction<boolean>) => {
      return {
        ...state,
        ruler: action.payload,
      };
    },
    switchCartDisplay: (state: DesignPageButtonState) => {
      return {
        ...state,
        isCartOpen: !state.isCartOpen,
        sideBar: false,
      };
    },
    usePaintBucket: (state: DesignPageButtonState, action: PayloadAction<boolean>) => {
      return {
        ...state,
        paintPopover: action.payload,
        sideBar: false,
      };
    },
    switchSideBar: (state: DesignPageButtonState, action: PayloadAction<boolean>) => {
      return {
        ...state,
        sideBar: action.payload,
        isCartOpen: false,
      };
    },
  },
});

export const { switchRuler, switchCartDisplay, usePaintBucket, switchSideBar } =
  DesignPageButtonSlice.actions;

export default DesignPageButtonSlice.reducer;
