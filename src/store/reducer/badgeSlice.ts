import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BadgeImageState {
  badgeImageUrl: string | null;
  width: number;
  height: number;
}

export interface BadgeState {
  isBadgeUsed: boolean;
  isBadgeLoaded: boolean;
  badgeImage: BadgeImageState;
}

export const initialState: BadgeState = {
  isBadgeUsed: false,
  isBadgeLoaded: false,
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
    switchBadgeLoaded: (state: BadgeState, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isBadgeLoaded: action.payload,
      };
    },
    setBadgeImage: (state: BadgeState, action: PayloadAction<BadgeImageState>) => {
      return {
        ...state,
        badgeImage: action.payload,
      };
    },
  },
});

export const { switchBadgeUsed, switchBadgeLoaded, setBadgeImage } = badgeSlice.actions;

export default badgeSlice.reducer;
