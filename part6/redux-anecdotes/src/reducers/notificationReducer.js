import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    notificationChange(state, action) {
      console.log(action);
      return action.payload;
    },
  },
});

export const setNotification = (notification, time) => {
  return async (dispatch) => {
    dispatch(notificationChange(notification));
    await setTimeout(() => {
      dispatch(notificationChange(""));
    }, time * 1000);
  };
};

export const { notificationChange } = notificationSlice.actions;
export default notificationSlice.reducer;
