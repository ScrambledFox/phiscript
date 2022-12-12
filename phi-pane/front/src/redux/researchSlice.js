import { createSlice } from "@reduxjs/toolkit";

import Data from "../data/researchPrompts.json";

export const researchSlice = createSlice({
  name: "research",
  initialState: {
    currentPromptIndex: -1,
    currentPrompt: {},
    points: [],
    researchDone: false,
  },
  reducers: {
    nextPrompt: (state) => {
      state.points = [];

      state.currentPromptIndex++;
      state.currentPrompt = Data.prompts[state.currentPromptIndex];
    },
    previousPrompt: (state) => {
      state.points = [];

      state.currentPromptIndex--;
      state.currentPrompt = Data.prompts[state.currentPromptIndex];
    },
    addPoint: (state, action) => {
      const point = {
        index: state.points.length,
        x: action.payload.x,
        y: action.payload.y,
      };
      state.points = [...state.points, point];
    },
    resetPoints: (state, action) => {
      state.points = [];
    },
    setResearchDone: (state, action) => {
      state.researchDone = true;
    },
  },
});

export const {
  nextPrompt,
  previousPrompt,
  addPoint,
  resetPoints,
  setResearchDone,
} = researchSlice.actions;
export default researchSlice.reducer;
