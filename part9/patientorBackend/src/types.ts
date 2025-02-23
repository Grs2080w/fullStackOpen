export interface Diagnostic {
	code: string
	name: string
	latin?: string
}

export enum Gender {
	Male = "male",
	Female = "female",
	Other = "other",
}

interface BaseEntry {
	id: string
	date: string
	specialist: string
	description: string

	diagnosisCodes?: Array<Diagnostic["code"]>
}

interface OccupationalHealthcare extends BaseEntry {
	type: "OccupationalHealthcare"
	employerName: string
	sickLeave?: {
		startDate: string
		endDate: string
	}
}

interface HospitalEntry extends BaseEntry {
	type: "Hospital"
	discharge?: {
		date: string
		criteria: string
	}
}

export enum HealthCheckRating {
	"Healthy" = 0,
	"LowRisk" = 1,
	"HighRisk" = 2,
	"CriticalRisk" = 3,
}

interface HealthCheckEntry extends BaseEntry {
	type: "HealthCheck"
	healthCheckRating: HealthCheckRating
}

export type Entry = HospitalEntry | HealthCheckEntry | OccupationalHealthcare

export interface Patient {
	id: string
	name: string
	dateOfBirth: string
	ssn: string
	gender: string
	occupation: string
	entries?: Entry[]
}

export type newEntry = Omit<Patient, "entries">

export type newPatient = Omit<Patient, "id">

export type patientForView = Omit<Patient, "ssn" | "entries">
