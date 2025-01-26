import axios from "axios"

const baseUrl = "http://localhost:3003/api/users"

export async function getUsers() {
	return await axios.get(baseUrl)
}
