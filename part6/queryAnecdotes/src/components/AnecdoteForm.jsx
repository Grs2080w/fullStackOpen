import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewAnecdote } from "../services/services";
import { useContext } from "react";
import NotificationContext from "../NotificationContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();

  const newAnec = useMutation({
    mutationFn: createNewAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });

  const [, NotificationDispatch] = useContext(NotificationContext);

  const onCreate = (event) => {
    event.preventDefault();

    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnec.mutate(content, {
      onSuccess: () => {
        NotificationDispatch({
          type: "NEW_ANECDOTE",
          content,
        });
      },
      onError: (error) => {
        if (error.message === "Network Error") {
          NotificationDispatch({
            type: "ERROR_ADDING_ANECDOTE",
            message: "Network Error",
          });
        } else if (error.message === "Request failed with status code 400") {
          NotificationDispatch({
            type: "ERROR_ADDING_ANECDOTE",
            message: error.response.data.error,
          });
        }
      },
      retry: false,
    });
  };

  return (
    <div style={{ marginBottom: 10 }}>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
