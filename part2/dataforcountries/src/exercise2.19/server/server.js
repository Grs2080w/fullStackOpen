import axios from "axios";

let url = "https://restcountries.com/v3.1/name/"

export default async function getCountrie(countrie) {
    return await axios.get(url + countrie)
};