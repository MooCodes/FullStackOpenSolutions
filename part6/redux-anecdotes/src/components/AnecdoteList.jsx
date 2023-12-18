import { useSelector, useDispatch } from "react-redux";
import { voteFor } from "../reducers/anecdoteReducer";
import { notificationChange } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filterTerm = useSelector((state) => state.filter);

  const filteredAnecdotes = anecdotes.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(filterTerm.toLowerCase())
  );

  const dispatch = useDispatch();

  const vote = (id) => {
    console.log("vote", id);

    dispatch(voteFor(id));

    const anecdote = anecdotes.find((anecdote) => anecdote.id === id);

    dispatch(notificationChange(`You voted for ` + anecdote.content));

    setTimeout(() => {
      dispatch(notificationChange(""));
    }, 5000);
  };

  const sortedAnecdotes = filteredAnecdotes.sort((a, b) => b.votes - a.votes);

  return (
    <div>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
