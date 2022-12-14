import { createSlice } from "@reduxjs/toolkit";

import Data from "../data/researchPrompts.json";

export const researchSlice = createSlice({
  name: "research",
  initialState: {
    currentPromptIndex: -1,
    currentPrompt: {},
    points: [],
    researchDone: false,

    xSize: 1,
    ySize: 1,
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
    setPoints: (state, action) => {
      state.points = [...action.payload];
    },
    resetPoints: (state, action) => {
      state.points = [];
    },
    setResearchDone: (state, action) => {
      state.researchDone = true;
    },
    setXSize: (state, action) => {
      state.xSize = action.payload;
    },
    setYSize: (state, action) => {
      state.ySize = action.payload;
    },
  },
});

export const {
  nextPrompt,
  previousPrompt,
  addPoint,
  setPoints,
  resetPoints,
  setResearchDone,
  setXSize,
  setYSize,
} = researchSlice.actions;
export default researchSlice.reducer;
