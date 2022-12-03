import { configureStore } from "@reduxjs/toolkit";

import networkReducer from "./networkSlice";
import dataSlice from "./dataSlice";

export default configureStore({
  reducer: {
    network: networkReducer,
    data: dataSlice,
  },
});
