import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../utils/axios";

export const getTestData = createAsyncThunk("test commu btw fe & be", async () => {
  api(process.env.NEXT_PUBLIC_TEST_API!, { method: "get" })
    .then((response) => alert("connection successful" + response.data))
    .catch((error) => alert("Connection failed"));
});
