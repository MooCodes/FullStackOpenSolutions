import { configureStore } from "@reduxjs/toolkit";
import msgReducer from "./reducers/msgReducer";
import blogReducer from "./reducers/blogReducer";

export default configureStore({
  reducer: {
    msg: msgReducer,
    blogs: blogReducer,
  },
});
