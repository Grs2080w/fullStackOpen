import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import AnecdoteList from "./components/AnecdoteList";

import NotificationContext from "./NotificationContext";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAll, altVote } from "./services/services";

import { useContext } from "react";

const App = () => {
  const [, NotificationDispatch] = useContext(NotificationContext);

  const queryClient = useQueryClient();

  const voteMut = useMutation({
    mutationFn: altVote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });

  const handleVote = (anecdote) => {
    voteMut.mutate(anecdote);

    NotificationDispatch({
      id: anecdote.id,
      type: "NEW_VOTE",
    });
  };

  const anec = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAll,
  });

  let anecdotes;
  anec.isSuccess === true ? (anecdotes = anec.data.data) : (anecdotes = []);

  if (anec.isSuccess === false && anec.isLoading === true) {
    return (
      <div>
        <h3>Anecdote service not avaliable due to problem in server</h3>
      </div>
    );
  } else {
    return (
      <div>
        <h2>Anecdotes</h2>
        <Notification />
        <AnecdoteForm />
        <AnecdoteList anecdotes={anecdotes} handleVote={handleVote} />
      </div>
    );
  }
};

export default App;
