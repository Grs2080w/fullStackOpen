import { createSlice } from "@reduxjs/toolkit";

function setNewFilter(filter, anecdotes) {
  return {
    type: "filter/setFilter",
    payload: {
      filter,
      anecdotes,
    },
  };
}

function voteAnecdoteFilter(id) {
  return {
    type: "filter/voteFilter",
    payload: id,
  };
}


const filterSlice = createSlice({
  name: "filter",
  initialState: [],
  reducers: {
    setFilter(state, { payload }) {
      
      let regExp = new RegExp(payload.filter, "i");
      let personsFiltered = payload.anecdotes.filter(
        (note) => note.content.search(regExp) !== -1
      );

      return personsFiltered;
    },
    
    voteFilter(state, { payload }) {
      let id = payload;
      let anecdoteToVote = state.find((a) => a.id === id);
      let votedAnecdote = { ...anecdoteToVote, votes: anecdoteToVote.votes + 1 };
    
      return state.map((anecdote) => {
        return anecdote.id === id ? votedAnecdote : anecdote;
      });
    }
    
  }

})


let filterReducer = filterSlice.reducer
export { filterReducer, setNewFilter, voteAnecdoteFilter };
