import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LoginModalState {
  loginModalOpen: boolean;
}

export const initialState: LoginModalState = {
  loginModalOpen: false,
};

export const loginModalSlice = createSlice({
  name: "LoginModal",
  initialState,
  reducers: {
    useLoginModal: (state: LoginModalState, action: PayloadAction<boolean>) => {
      return {
        ...state,
        loginModalOpen: action.payload,
      };
    },
  },
});

export const { useLoginModal } = loginModalSlice.actions;

export default loginModalSlice.reducer;
