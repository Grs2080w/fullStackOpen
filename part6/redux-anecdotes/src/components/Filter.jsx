import { useDispatch, useSelector } from "react-redux";
import { setNewFilter } from "../reducers/filterReducer";
//import { setFilter } from "../reducers/filterReducer";

export default function Filter() {
  let dispatch = useDispatch();
  let anecdotes = useSelector((state) => state.anecdotes);

  const handleChange = ({ target }) => {
    dispatch(setNewFilter(target.value, anecdotes));
  };

  return (
    <div style={{ marginBottom: 10 }}>
      filter <input onChange={handleChange} />
    </div>
  );
}
