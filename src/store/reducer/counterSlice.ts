import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../utils/axios";
import { RootState } from "..";

export interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

export const getTestData = createAsyncThunk("test commu btw fe & be", async (state) => {
  api(process.env.NEXT_PUBLIC_TEST_API!, { method: "get" })
    .then((response) => alert("connection successful" + response.data))
    .catch((error) => alert("Connection failed"));
});

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    clear: (state) => {
      state.value = 0;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});
export const { increment, decrement, clear, incrementByAmount } = counterSlice.actions;

export const changeCounter = (state: RootState) => state.counter.value;

export default counterSlice.reducer;
