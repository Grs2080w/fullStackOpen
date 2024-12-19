import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

export function getAll() {
    return axios.get(baseUrl);
};

export function create(newObject) {
    return axios.post(baseUrl, newObject);
};

export function remove(person) {
    return axios.delete(`${baseUrl}/${person.id}`);
}

export function alter(person) {
    return axios.put(`${baseUrl}/${person.id}`, {...person, number: person.number});
}


