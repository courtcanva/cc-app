import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ButtonToggleState {
  isRulerOn: boolean;
  isCartOpen: boolean;
  isPaintPopoverOpen: boolean;
  isSavePopoverOpen: boolean;
  isSideBarOpen: boolean;
  isLoginModalOpen: boolean;
  isCreateTemplateOpen: boolean;
  isOrderGenerationOpen: boolean;
}

export const initialState: ButtonToggleState = {
  isRulerOn: true,
  isCartOpen: false,
  isPaintPopoverOpen: false,
  isSavePopoverOpen: false,
  isSideBarOpen: false,
  isLoginModalOpen: false,
  isCreateTemplateOpen: false,
  isOrderGenerationOpen: false,
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
        isOrderGenerationOpen: false,
      };
    },
    switchPaintBucket: (state: ButtonToggleState, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isPaintPopoverOpen: action.payload,
        isSideBarOpen: false,
      };
    },
    switchSavePopover: (state: ButtonToggleState, action: PayloadAction<boolean>) => {
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
    switchLoginModal: (state: ButtonToggleState, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isLoginModalOpen: action.payload,
        isSideBarOpen: false,
      };
    },
    switchCreateTemplate: (state: ButtonToggleState, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isCreateTemplateOpen: action.payload,
        isCartOpen: false,
        isSideBarOpen: false,
        isOrderGenerationOpen: false,
      };
    },
    switchOrderGeneration: (state: ButtonToggleState, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isOrderGenerationOpen: action.payload,
      };
    },
  },
});

export const {
  switchRuler,
  switchCartDisplay,
  switchPaintBucket,
  switchSavePopover,
  switchSideBar,
  switchLoginModal,
  switchCreateTemplate,
  switchOrderGeneration,
} = ButtonToggleSlice.actions;

export default ButtonToggleSlice.reducer;
