import { HealthCheckEntry, Patient } from "../../services/types"

interface Props {
	entry: HealthCheckEntry
	patient: Patient
}

export default function HealthCheckRating({ entry, patient }: Props) {
	function returnComponent(heart: string) {
		return (
			<div id="entry" key={entry.id}>
				{`${patient.dateOfBirth} ⛑️`} <br />
				<i>{entry.description}</i> <br />
				{heart} <br />
				{entry.specialist}
			</div>
		)
	}

	switch (entry.healthCheckRating) {
		case 0:
			return returnComponent("💚")
		case 1:
			return returnComponent("💛")
		case 2:
			return returnComponent("🧡")
		case 3:
			return returnComponent("❤️")
	}
}
