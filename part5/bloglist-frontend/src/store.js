import { configureStore } from "@reduxjs/toolkit";
import msgReducer from "./reducers/msgReducer";

export default configureStore({
  reducer: {
    msg: msgReducer,
  },
});
