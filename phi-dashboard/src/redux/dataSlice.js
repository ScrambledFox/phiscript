import { createSlice } from "@reduxjs/toolkit";

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    triggers: [],
    actions: [],
  },
  reducers: {
    setData: (state, action) => {
      state.triggers = action.payload.triggers;
      state.actions = action.payload.actions;
    },
  },
});

export const { setData } = dataSlice.actions;
export default dataSlice.reducer;
