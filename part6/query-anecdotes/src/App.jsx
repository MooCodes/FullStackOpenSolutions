import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";

import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getAnecdotes, updateAnecdote } from "./requests";
import { useNotificationMsgDispatch } from "./NotificationContext";

const App = () => {
  const queryClient = useQueryClient();
  const notificationMsgDispatch = useNotificationMsgDispatch();

  const mutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(
        ["anecdotes"],
        anecdotes.map((anecdote) =>
          updatedAnecdote.id === anecdote.id ? updatedAnecdote : anecdote
        )
      );
    },
  });

  const handleVote = (anecdote) => {
    console.log("vote");
    mutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });

    notificationMsgDispatch({ type: "VOTE", payload: anecdote.content });
    setTimeout(() => {
      notificationMsgDispatch({ type: "" });
    }, 3000);
  };

  const query = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: false,
  });

  if (query.isLoading) return <div>API fetch is loading...</div>;

  if (query.isError)
    return <div>anecdote service not available due to problems in server</div>;

  const anecdotes = query.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
