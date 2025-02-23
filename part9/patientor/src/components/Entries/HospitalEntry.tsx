import { Entry, Patient } from "../../services/types"

interface Props {
	entry: Entry
	patient: Patient
}

export default function HospitalEntry({ entry, patient }: Props) {
	return (
		<div id="entry" key={entry.id}>
			{`${patient.dateOfBirth} 🏥`} <br />
			<i>{entry.description}</i> <br />
			{entry.specialist}
		</div>
	)
}
