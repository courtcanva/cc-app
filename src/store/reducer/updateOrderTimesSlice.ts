import { createSlice } from "@reduxjs/toolkit";

export const updateOrderTimesSlice = createSlice({
  name: "updateOrderTimes",
  initialState: {
    value: 0,
  },
  reducers: {
    add: (state) => {
      state.value += 1;
    },
  },
});

export const { add } = updateOrderTimesSlice.actions;
export default updateOrderTimesSlice.reducer;
