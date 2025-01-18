import { useDispatch } from "react-redux";
import { setNewAnecdote } from "../reducers/anecdoteReducer";
import {
  setNotification,
  dumpNotification,
} from "../reducers/notificationReducer";

export default function AnecdoteForm() {
  let dispatch = useDispatch();

  const addAnecdote = (e) => {
    e.preventDefault();

    const content = e.target.input.value;
    e.target.input.value = "";
    
    dispatch(setNewAnecdote(content));

    dispatch(
      setNotification(
        `Created a new new anecdote ${content.slice(0, 10)}` + "..."
      )
    );
    setTimeout(() => dispatch(dumpNotification()), 3000);
  };

  return (
    <div>
      <h2>create new</h2>

      <form onSubmit={addAnecdote}>
        <div>
          <input name="input" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
}
