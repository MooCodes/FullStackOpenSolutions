import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/ancedotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
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

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const { voteFor, appendAnecdote, setAnecdotes } = anecdoteSlice.actions;

export default anecdoteSlice.reducer;
