import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ButtonToggleState {
  isRulerOn: boolean;
  isCartOpen: boolean;
  isPaintPopoverOpen: boolean;
  isSavePopoverOpen: boolean;
  isSideBarOpen: boolean;
  isLoginModalOpen: boolean;
  isCreateTemplateOpen: boolean;
  isTemplateSelect: boolean;
  isOrderGenerationOpen: boolean;
  isMyTemplateOpen: boolean;
  isMyOrderOpen: boolean;
  isSwitch3D: boolean;
  isMyAccountOpen: boolean;
}

export const initialState: ButtonToggleState = {
  isRulerOn: true,
  isCartOpen: false,
  isPaintPopoverOpen: false,
  isSavePopoverOpen: false,
  isSideBarOpen: false,
  isLoginModalOpen: false,
  isCreateTemplateOpen: false,
  isTemplateSelect: false,
  isOrderGenerationOpen: false,
  isMyTemplateOpen: false,
  isMyOrderOpen: false,
  isSwitch3D: false,
  isMyAccountOpen: false,
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
        isCartOpen: state.isOrderGenerationOpen || !state.isCartOpen,
        isSideBarOpen: false,
        isOrderGenerationOpen: false,
        isMyTemplateOpen: false,
        isMyOrderOpen: false,
        isSwitch3D: false,
        isMyAccountOpen: false,
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
        isSwitch3D: false,
      };
    },
    switchCreateTemplate: (state: ButtonToggleState, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isCreateTemplateOpen: action.payload,
        isCartOpen: false,
        isSideBarOpen: false,
        isOrderGenerationOpen: false,
        isMyTemplateOpen: false,
        isMyOrderOpen: false,
        isSwitch3D: false,
        isMyAccountOpen: false,
      };
    },
    switchOrderGeneration: (state: ButtonToggleState, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isOrderGenerationOpen: action.payload,
      };
    },
    switchMyTemplateDisplay: (state: ButtonToggleState, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isMyTemplateOpen: action.payload,
        isMyOrderOpen: false,
        isCartOpen: false,
        isOrderGenerationOpen: false,
        isSwitch3D: false,
      };
    },
    switchMyOrderDisplay: (state: ButtonToggleState, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isMyOrderOpen: action.payload,
        isMyTemplateOpen: false,
        isCartOpen: false,
        isOrderGenerationOpen: false,
        isSwitch3D: false,
        isMyAccountOpen: false,
      };
    },
    startSelectTemplate: (state: ButtonToggleState, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isTemplateSelect: action.payload,
      };
    },
    switch3D: (state: ButtonToggleState, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isSwitch3D: action.payload,
        isCartOpen: false,
        isOrderGenerationOpen: false,
        isSideBarOpen: false,
        isPaintPopoverOpen: false,
        isTemplateSelect: false,
        isMyTemplateOpen: false,
        isSavePopoverOpen: false,
      };
    },
    switchMyAccount: (state: ButtonToggleState, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isMyAccountOpen: action.payload,
        isCartOpen: false,
        isOrderGenerationOpen: false,
        isSwitch3D: false,
        isMyTemplateOpen: false,
        isCreateTemplateOpen: false,
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
  switchMyTemplateDisplay,
  switchMyOrderDisplay,
  startSelectTemplate,
  switchOrderGeneration,
  switch3D,
  switchMyAccount,
} = ButtonToggleSlice.actions;

export default ButtonToggleSlice.reducer;
