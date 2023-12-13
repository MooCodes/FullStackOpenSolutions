import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    filterChange(state, action) {
      console.log(action);
      return action.payload;
    },
  },
});

export const { filterChange } = filterSlice.actions;
export default filterSlice.reducer;
