import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createAnecdote } from "../requests";
import { useNotificationMsgDispatch } from "../NotificationContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();

  const notificationMsgDispatch = useNotificationMsgDispatch();

  const mutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote));

      notificationMsgDispatch({ type: "ADDED", payload: newAnecdote.content});
      setTimeout(() => {
        notificationMsgDispatch({ type: "" });
      }, 3000);
    },
    onError: (err) => {
      console.log(err);

      notificationMsgDispatch({ type: "ERROR", payload: err.message });
      setTimeout(() => {
        notificationMsgDispatch({ type: "" });
      }, 3000);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    console.log("new anecdote");

    mutation.mutate({ content: content, votes: 0 });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
