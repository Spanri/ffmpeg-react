import { configureStore } from "@reduxjs/toolkit";
import statusReducer from "./status";

export default configureStore({
  reducer: {
    status: statusReducer,
  },
});
