import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ButtonToggleState {
  isRulerOn: boolean;
  isCartOpen: boolean;
  isPaintPopoverOpen: boolean;
  isSavePopoverOpen: boolean;
  isSideBarOpen: boolean;
  isLoginModalOpen: boolean;
}

export const initialState: ButtonToggleState = {
  isRulerOn: true,
  isCartOpen: false,
  isPaintPopoverOpen: false,
  isSavePopoverOpen: false,
  isSideBarOpen: false,
  isLoginModalOpen: false,
};

export const ButtonToggleSlice = createSlice({
  name: "ButtonToggle",
  initialState,
  reducers: {
    switchRuler: (state: ButtonToggleState, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isRulerOn: action.payload,
      };
    },
    switchCartDisplay: (state: ButtonToggleState) => {
      return {
        ...state,
        isCartOpen: !state.isCartOpen,
        isSideBarOpen: false,
      };
    },
    usePaintBucket: (state: ButtonToggleState, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isPaintPopoverOpen: action.payload,
        isSideBarOpen: false,
      };
    },
    useSavePopover: (state: ButtonToggleState, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isSavePopoverOpen: action.payload,
        isSideBarOpen: false,
      };
    },
    switchSideBar: (state: ButtonToggleState, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isSideBarOpen: action.payload,
        isCartOpen: false,
      };
    },
    useLoginModal: (state: ButtonToggleState, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isLoginModalOpen: action.payload,
        isSideBarOpen: false,
      };
    },
  },
});

export const {
  switchRuler,
  switchCartDisplay,
  usePaintBucket,
  useSavePopover,
  switchSideBar,
  useLoginModal,
} = ButtonToggleSlice.actions;

export default ButtonToggleSlice.reducer;
