import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAnecdotes = () => axios.get(baseUrl).then((res) => res.data);

export const createAnecdote = (newAnecdote) => {
  if (newAnecdote.content.length < 5)
    throw new Error(`Anecdote has a length of ${newAnecdote.content.length}. Needs to be at least 5 characters.`);

  return axios.post(baseUrl, newAnecdote).then((res) => res.data);
};

export const updateAnecdote = (newAnecdote) =>
  axios.put(`${baseUrl}/${newAnecdote.id}`, newAnecdote);
