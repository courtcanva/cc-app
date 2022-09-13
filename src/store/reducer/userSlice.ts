import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
export interface UserState {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
}

export const initialState: UserState = {
  userId: "",
  email: "",
  firstName: "",
  lastName: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserInfo: (state: UserState, action: PayloadAction<UserState>) => {
      return action.payload;
    },
  },
});

export const defaultUser = initialState;
export const { updateUserInfo } = userSlice.actions;
export const userData = (state: RootState) => state.user;

export default userSlice.reducer;
