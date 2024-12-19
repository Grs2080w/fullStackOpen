import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

export async function getAll() {
    return await axios.get(baseUrl);
};

export async function create(newObject) {
    return await axios.post(baseUrl, newObject);
};

export async function remove(person) {

    let persons;
    await getAll().then(response => persons = response.data);

    persons.forEach(element => {
        if (element.name === person.name) {

            return axios.delete(`${baseUrl}/${person.id}`);

        }
    });
}


export async function alter(person) {

    return axios.put(`${baseUrl}/${person.id}`, {...person, number: person.number})


}


