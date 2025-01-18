import { useDispatch, useSelector } from "react-redux";
import { addNewVote } from "../reducers/anecdoteReducer";
import { voteAnecdoteFilter } from "../reducers/filterReducer";
import { newNotification } from "../reducers/notificationReducer";

export default function AnecdoteList() {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filtered = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const vote = (obj) => {
    filtered.length > 0 ? dispatch(voteAnecdoteFilter(obj.id)) : null;
    dispatch(addNewVote(obj));
    dispatch(newNotification(`Voted anecdote ${obj.id}`, 3));
  };

  let anecdotesSorted = [...anecdotes].sort((a, b) => b.votes - a.votes);

  if (filtered.length > 0) {
    anecdotesSorted = [...filtered].sort((a, b) => b.votes - a.votes);
  }

  return (
    <div>
      {anecdotesSorted.map((anecdote) => (
        <div style={{ marginBottom: 5 }} key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
}
