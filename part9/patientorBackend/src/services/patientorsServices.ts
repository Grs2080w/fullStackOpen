import { object, z } from "zod"
import { v4 as uuid } from "uuid"

// Services
import { Diagnostic, patientForView, Patient, newEntry, Gender, Entry } from "../types"

// Datas
import dataPatients from "../datas/patients"
import dataDiagnostic from "../datas/diagnostics"

export const getDiagnostics = (): Diagnostic[] => {
	return dataDiagnostic
}

export const getPatients = (): patientForView[] => {
	return dataPatients.map((patient) => {
		return {
			id: patient.id,
			name: patient.name,
			dateOfBirth: patient.dateOfBirth,
			gender: patient.gender,
			occupation: patient.occupation,
		}
	})
}

export const getPatientsFull = (): Patient[] => {
	return dataPatients.map((patient) => {
		return {
			id: patient.id,
			name: patient.name,
			dateOfBirth: patient.dateOfBirth,
			ssn: patient.ssn,
			gender: patient.gender,
			occupation: patient.occupation,
			entries: patient.entries,
		}
	})
}

export const newEntryBody = (params: unknown) => {
	const newPatient = z.object({
		name: z.string().nonempty("name is required"),
		dateOfBirth: z
			.string()
			.date()
			.min(1)
			.regex(/^\d{4}-\d{2}-\d{2}$/),
		ssn: z.string(),
		gender: z.nativeEnum(Gender),
		occupation: z.string(),
	})

	return newPatient.parse(params)
}

export const addPatient = ({ name, dateOfBirth, ssn, gender, occupation }: newEntry) => {
	const newPatient = {
		name,
		dateOfBirth,
		ssn,
		gender,
		occupation,
		id: uuid(),
	}

	dataPatients.push(newPatient)
}

const parseDiagnosisCodes = (object: unknown): Array<Diagnostic["code"]> => {
	if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
		return [] as Array<Diagnostic["code"]>
	}
	return object.diagnosisCodes as Array<Diagnostic["code"]>
}

const parseObject = (entry: Entry): Boolean => {
	if (entry.type === "Hospital" || entry.type === "HealthCheck" || entry.type === "OccupationalHealthcare" || !parseDiagnosisCodes(entry)) {
		return true
	} else {
		return false
	}
}

export const addNewEntry = (id: string, entry: Entry) => {
	const patient = dataPatients.filter((pat) => pat.id === id)[0]

	if (!patient) {
		return null
	}

	if (parseObject(entry)) {
		const newEntry = { ...entry, id: uuid() }
		const newEntryJson = JSON.stringify(newEntry)

		console.log(`--> New Entry Added to patient ${id} with object ${newEntryJson}`)

		dataPatients.map((patient) => {
			if (patient.id === id) {
				patient.entries?.push(newEntry)
			}
		})
	}

	return dataPatients
}
