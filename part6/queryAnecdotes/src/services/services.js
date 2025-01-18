import axios from "axios";

export async function getAll() {
    return await axios.get("http://localhost:3001/anecdotes");
}

export async function createNewAnecdote(content) {
    return await axios.post("http://localhost:3001/anecdotes", { content, votes: 0 });
}


export async function altVote(anecdote) {
    return await axios.put(`http://localhost:3001/anecdotes/${anecdote.id}`, { ...anecdote, votes: anecdote.votes + 1 });
}