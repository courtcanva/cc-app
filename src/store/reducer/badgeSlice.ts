import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BadgeImageState } from "@/interfaces/design";
export interface BadgeState {
  isBadgeUsed: boolean;
  badgeImage: BadgeImageState;
}

export const initialState: BadgeState = {
  isBadgeUsed: false,
  badgeImage: {
    badgeImageUrl: null,
    width: 0,
    height: 0,
  },
};

export const badgeSlice = createSlice({
  name: "badge",
  initialState,
  reducers: {
    switchBadgeUsed: (state: BadgeState, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isBadgeUsed: action.payload,
      };
    },
    setBadgeImage: (state: BadgeState, action: PayloadAction<BadgeImageState>) => {
      return {
        ...state,
        badgeImage: action.payload,
      };
    },
    resetBadgeImage: () => {
      return initialState;
    },
  },
});

export const { switchBadgeUsed, setBadgeImage, resetBadgeImage } = badgeSlice.actions;

export default badgeSlice.reducer;
