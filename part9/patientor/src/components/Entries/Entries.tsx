import { Patient, Entry } from "../../services/types"

// Components
import HealthCheckRating from "./HealthCheckRating"
import HospitalEntry from "./HospitalEntry"
import OccupationalHealthcare from "./OccupationalHealthcare"

interface Props {
	patient: Patient
	entry: Entry
}

export default function Entries({ patient, entry }: Props) {
	switch (entry.type) {
		case "HealthCheck":
			return <HealthCheckRating patient={patient} entry={entry} />
		case "Hospital":
			return <HospitalEntry patient={patient} entry={entry} />
		case "OccupationalHealthcare":
			return <OccupationalHealthcare patient={patient} entry={entry} />
	}
}
