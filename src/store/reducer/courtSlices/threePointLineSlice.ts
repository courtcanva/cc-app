import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from '../..'

interface ThreePointLineState {
  startPointX:number,
  startPointY:number,
  cornerThreePointLineLength:number,
  controlPointOneX:number,
  controlPointOneY:number,
  controlPointTwoX:number,
  controlPointTwoY:number,
  controlPointThreeX:number,
  controlPointThreeY:number,
  controlPointFourX:number,
  controlPointFourY:number,
  threePointLineRadius:number,
}

const initialState:ThreePointLineState = {
  startPointX:15.75,
  startPointY:0,
  cornerThreePointLineLength:15.75,
  controlPointOneX:81.75,
  controlPointOneY:0,
  controlPointTwoX:81.75,
  controlPointTwoY:66,
  controlPointThreeX:81.75,
  controlPointThreeY:132,
  controlPointFourX:0,
  controlPointFourY:132,
  threePointLineRadius:66,
}

export const threePointLineSlice = createSlice({
  name: "threePointLine",
  initialState,
  reducers:{
    changeStartPoint:(state,action:PayloadAction) => {
      // state.startPointX = action.payload;
      // state.startPointY = action.payload;
    }
  }
})

export const { changeStartPoint } = threePointLineSlice.actions;

export const threePointLineData = (state: RootState) => state.threePointLine;

export default threePointLineSlice.reducer;