const vote = (id) => {
  const anecdote = anecdoteById(id);

  const voted = {
    ...anecdote,
    votes: anecdote.votes + 1,
  };

  setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
};
