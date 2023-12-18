import { useSelector, useDispatch } from "react-redux";
import { voteFor } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filterTerm = useSelector((state) => state.filter);

  const filteredAnecdotes = anecdotes.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(filterTerm.toLowerCase())
  );

  const dispatch = useDispatch();

  const vote = (id) => {
    const anecdote = anecdotes.find((anecdote) => anecdote.id === id);

    dispatch(voteFor(id, anecdote));

    dispatch(setNotification(`You voted for ${anecdote.content}`, 5));
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
