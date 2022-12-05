import { createSlice } from "@reduxjs/toolkit";

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    triggers: [],
    actions: [],
    isDirty: false,
  },
  reducers: {
    setData: (state, action) => {
      state.triggers = action.payload.triggers;
      state.actions = action.payload.actions;
    },
    setIsDirty: (state, action) => {
      state.isDirty = action.payload;
    },
  },
});

export const { setData, setIsDirty } = dataSlice.actions;
export default dataSlice.reducer;
