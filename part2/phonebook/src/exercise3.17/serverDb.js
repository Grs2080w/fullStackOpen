import axios from "axios";

const baseUrl = "http://localhost:3001/api/persons";

export async function getAll() {
    return await axios.get(baseUrl);
};

export async function create(newObject) {
    return await axios.post(baseUrl, newObject);
};

export async function remove({_id}) {
    console.log(_id);
    return axios.delete(`${baseUrl}/${_id}`);

}

export async function altere(person) {

    return axios.put(`${baseUrl}/${person._id}`, {...person, number: person.number})

}


