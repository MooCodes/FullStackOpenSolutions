import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/ancedotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      console.log(action);
      state.push(action.payload);
    },
    voteFor(state, action) {
      return state.map((anecdoteObject) => {
        return anecdoteObject.id === action.payload
          ? { ...anecdoteObject, votes: anecdoteObject.votes + 1 }
          : anecdoteObject;
      });
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const { createAnecdote, voteFor, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

export default anecdoteSlice.reducer;
