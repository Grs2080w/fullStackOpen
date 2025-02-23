import { OccupationalHealthcare as OccupationalHealthcareType, Patient } from "../../services/types"

interface Props {
	entry: OccupationalHealthcareType
	patient: Patient
}

export default function OccupationalHealthcare({ entry, patient }: Props) {
	return (
		<div id="entry" key={entry.id}>
			{`${patient.dateOfBirth} 💼 ${entry.employerName}`} <br />
			<i>{entry.description}</i> <br />
			{entry.specialist}
		</div>
	)
}
