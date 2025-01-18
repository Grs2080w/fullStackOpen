import axios from "axios";

let baseUrl = "http://localhost:3000/anecdotes";

export async function getAll() {
  const response = await axios.get(baseUrl);
  return response.data;
}

export async function createNewAnecdote(content) {
  let anecdotesLenght = await getAll().length;
  let id = anecdotesLenght;
  let res = await axios.post(baseUrl, { content, id, votes: 0 });
  return res.data;
}

export async function vote(object) {
  let res = await axios.put(`${baseUrl}/${object.id}`, {
    ...object,
    votes: object.votes + 1,
  });
  return res.data;
}
