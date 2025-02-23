import { Entry, Patient, PatientFormValues, newEntryFromPatient } from "./types"
import axios from "axios"

import { apiBaseUrl } from "./constants"

const getAll = async () => {
	const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`)

	return data
}

const getDiagnostics = async () => {
	const { data } = await axios.get(`${apiBaseUrl}/Diagnostics`)
	return data
}

const create = async (object: PatientFormValues) => {
	const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object)
	return data
}

const getPatient = async (id: string) => {
	const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`)
	return data
}

const addNewEntry = async (entry: newEntryFromPatient, id: string) => {
	const res = await axios.post<Entry[]>(`${apiBaseUrl}/patients/${id}/entries`, entry)
	if (res.status === 500) {
		throw new Error("patient not localized")
	}
}

export { getAll, create, getPatient, getDiagnostics, addNewEntry }
