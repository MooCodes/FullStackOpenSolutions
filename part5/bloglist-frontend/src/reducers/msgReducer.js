import { createSlice } from "@reduxjs/toolkit";

export const msgSlice = createSlice({
  name: "msg",
  initialState: {
    msg: "",
    style: "",
  },
  reducers: {
    setMsg: (state, action) => {
      return action.payload;
    },
    reset: (state, action) => {
      return { msg: "", style: "" };
    },
  },
});

export const { setMsg, reset } = msgSlice.actions;
export default msgSlice.reducer;
