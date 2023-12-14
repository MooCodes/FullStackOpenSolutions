import { createSlice } from "@reduxjs/toolkit";

// const getId = () => (100000 * Math.random()).toFixed(0);

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0,
//   };
// };

// const initialState = anecdotesAtStart.map(asObject);

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

export const { createAnecdote, voteFor, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

export default anecdoteSlice.reducer;
