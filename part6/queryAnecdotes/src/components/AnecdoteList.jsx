import PropTypes from "prop-types";

export default function AnecdoteList({ anecdotes, handleVote }) {

  AnecdoteList.propTypes = {
    anecdotes: PropTypes.array,
    handleVote: PropTypes.func,
  };

  let anecdotesSorted = [...anecdotes].sort((a, b) => b.votes - a.votes);

  return (
    <div>
      {anecdotesSorted.map((anecdote) => (
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
}
