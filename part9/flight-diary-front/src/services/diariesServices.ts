import axios from "axios"
import { newDiarie } from "../types/types"
const baseURL = "http://localhost:3000/api/diaries"

export async function getAll() {
	return await axios.get(baseURL)
}

export async function addDiarie(param: newDiarie) {
	return await axios.post(baseURL, param)
}
