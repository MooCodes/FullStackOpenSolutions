import { configureStore } from "@reduxjs/toolkit";
import msgReducer from "./reducers/msgReducer";
import blogReducer from "./reducers/blogReducer";
import userReducer from "./reducers/userReducer";

export default configureStore({
  reducer: {
    msg: msgReducer,
    blogs: blogReducer,
    user: userReducer,
  },
});
