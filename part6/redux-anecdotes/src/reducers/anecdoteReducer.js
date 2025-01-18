import { createSlice } from "@reduxjs/toolkit";
import { createNewAnecdote } from "../services/anecdotes";
import { getAll, vote } from "../services/anecdotes";

// actions

function voteAnecdote(obj) {
  return {
    type: "anecdotes/vote",
    payload: obj.id,
  };
}

function newAnecdote(content) {
  return {
    type: "anecdotes/newAnecdote",
    payload: content,
  };
}

function setAnecdotes(anecdotes) {
  return {
    type: "anecdotes/setAnecdotes",
    payload: anecdotes,
  };
}

// reducer

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    vote(state, action) {
      let id = action.payload;
      let anecdoteToVote = state.find((a) => a.id === id);
      let votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1,
      };

      return state.map((anecdote) => {
        return anecdote.id === id ? votedAnecdote : anecdote;
      });
    },

    newAnecdote(state, { payload }) {
      return [...state, payload];
    },

    setAnecdotes(state, { payload }) {
      return payload;
    },
  },
});

let anecdotereducer = anecdoteSlice.reducer;
export { anecdotereducer, voteAnecdote, newAnecdote, setAnecdotes };

export const initializeNotes = () => {
  return async (dispatch) => {
    const notes = await getAll();
    dispatch(setAnecdotes(notes));
  };
};

export const setNewAnecdote = (content) => {
  return async (dispatch) => {
    let anecdote = await createNewAnecdote(content);
    dispatch(newAnecdote(anecdote));
  };
};

export const addNewVote = (obj) => {
  return async (dispatch) => {
    let res = await vote(obj);
    dispatch(voteAnecdote(res));
  };
};
