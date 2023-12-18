import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/ancedotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      return state.map((anecdoteObject) => {
        return anecdoteObject.id === action.payload.id
          ? action.payload
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

export const voteFor = (id, newAnecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.update(id, {
      ...newAnecdote,
      votes: newAnecdote.votes + 1,
    });
    dispatch(voteAnecdote(updatedAnecdote));
  };
};

export const { voteAnecdote, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

export default anecdoteSlice.reducer;
