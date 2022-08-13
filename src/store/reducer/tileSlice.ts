import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useStoreSelector } from "../hooks";
import undoable from "redux-undo";
export interface TileState {
  court: Court[];
}

export interface Court {
  location: string;
  color: string;
}
export interface ChangeTileColor {
  location: string;
  selectedColor: string;
}

export const initialState: TileState = {
  court: [
    {
      location: "threePoint",
      color: "#7088B1",
    },
    {
      location: "courtArea",
      color: "#E18E11",
    },
    {
      location: "topKeyArea",
      color: "#B6B6B6",
    },
    {
      location: "border",
      color: "#834085",
    },
    {
      location: "keyArea",
      color: "#2C4E8A",
    },
    {
      location: "circleArea",
      color: "#B6B6B6",
    },
  ],
};

export const tileSlice = createSlice({
  name: "tile",
  initialState,
  reducers: {
    changeTileColor: (state, action: PayloadAction<ChangeTileColor>) => {
      const selectedLocation = state.court.findIndex(
        (object) => object.location === action.payload.location
      );
      state.court[selectedLocation].color = action.payload.selectedColor;
    },
    changeWholeCourtColor: (state, action: PayloadAction<Court[]>) => {
      state.court = action.payload;
    },
    setDefaultCourtColor: (state, action: PayloadAction<TileState>) => {
      return action.payload;
    },
  },
});

export const defaultCourtColor = initialState;

export const { changeTileColor, changeWholeCourtColor, setDefaultCourtColor } = tileSlice.actions;

export const getColor = (location: string) =>
  useStoreSelector(
    (state) => state.tile.present.court?.find((tile) => tile.location.includes(location))?.color
  );

export default undoable(tileSlice.reducer);
