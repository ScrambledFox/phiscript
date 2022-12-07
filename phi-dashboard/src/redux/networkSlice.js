import { createSlice } from "@reduxjs/toolkit";

export const networkSlice = createSlice({
  name: "network",
  initialState: {
    isConnected: false,
  },
  reducers: {
    setConnected: (state, action) => {
      state.isConnected = action.payload;
    },
  },
});

export const { setConnected } = networkSlice.actions;
export default networkSlice.reducer;
