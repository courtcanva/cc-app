import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IStrokeColorState {
  courts: {
    location: string;
    strokeColor: string | undefined;
  }[];
}

export interface IStrokeColorPayload {
  court?: IStrokeColorState;
  location: string;
  strokeColor: string;
}

export const initialState: IStrokeColorState = {
  courts: [
    {
      location: "threePoint",
      strokeColor: "white",
    },
    {
      location: "courtArea",
      strokeColor: "white",
    },
    {
      location: "topKeyArea",
      strokeColor: "white",
    },
    {
      location: "border",
      strokeColor: "white",
    },
    {
      location: "keyArea",
      strokeColor: "white",
    },
    {
      location: "circleArea",
      strokeColor: "white",
    },
  ],
};

export const strokeColorSlice = createSlice({
  name: "strokeColor",
  initialState,
  reducers: {
    changeStrokeColor: (state: IStrokeColorState, action: PayloadAction<IStrokeColorPayload>) => {
      const selectedLocation = state.courts.findIndex(
        (court) => court.location === action.payload.location
      );
      state.courts[selectedLocation].strokeColor = action.payload.strokeColor;
    },
  },
});

export const { changeStrokeColor } = strokeColorSlice.actions;
export default strokeColorSlice.reducer;
