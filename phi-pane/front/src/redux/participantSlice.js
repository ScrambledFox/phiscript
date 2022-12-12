import { createSlice } from "@reduxjs/toolkit";

export const participantSlice = createSlice({
  name: "participant",
  initialState: {
    id: -1,
  },
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const { setId } = participantSlice.actions;
export default participantSlice.reducer;
