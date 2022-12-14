import { configureStore } from "@reduxjs/toolkit";
import participantSlice from "./participantSlice";
import researchSlice from "./researchSlice";

export default configureStore({
  reducer: {
    participant: participantSlice,
    research: researchSlice,
  },
});
