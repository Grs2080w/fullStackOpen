import { configureStore } from "@reduxjs/toolkit";

import { anecdotereducer } from "../reducers/anecdoteReducer";
import { filterReducer } from "../reducers/filterReducer";
import { notificationReducer } from "../reducers/notificationReducer";


const store = configureStore({
  reducer: {
    anecdotes: anecdotereducer,
    filter: filterReducer,
    notification: notificationReducer,
  },
});

export { store };
