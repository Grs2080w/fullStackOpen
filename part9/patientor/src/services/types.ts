export interface Diagnosis {
	code: String
	name: String
	latin?: String
}

export enum Gender {
	Male = "male",
	Female = "female",
	Other = "other",
}

interface BaseEntry {
	id: string
	date: string | undefined
	specialist: string
	description: string
	diagnosisCodes?: Array<Diagnosis["code"]>
}

export interface OccupationalHealthcare extends BaseEntry {
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

export interface HealthCheckEntry extends BaseEntry {
	type: "HealthCheck"
	healthCheckRating: HealthCheckRating | undefined
}

export type Entry = HealthCheckEntry | HospitalEntry | OccupationalHealthcare

export interface newEntryFromPatient {
	date: String | undefined
	specialist: String | undefined
	description: String | undefined
	diagnosisCodes: Array<Diagnosis["code"]>
	healthCheckRating?: HealthCheckRating
	discharge?: {
		date: string
		criteria: string
	}
	employerName?: String
	sickLeave?: {
		startDate: String | undefined
		endDate: String | undefined
	}
}

export interface Patient {
	id: string
	name: string
	occupation: string
	gender: Gender
	ssn?: string
	dateOfBirth?: string
	entries: Entry[]
}

export type PatientFormValues = Omit<Patient, "id" | "entries">
