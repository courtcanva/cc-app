import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
export interface UserState {
  googleId: string;
  email: string;
  firstName: string;
  lastName: string;
}

export const initialState: UserState = {
  googleId: "",
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

export const { updateUserInfo } = userSlice.actions;
export const userData = (state: RootState) => state.user;

export default userSlice.reducer;
