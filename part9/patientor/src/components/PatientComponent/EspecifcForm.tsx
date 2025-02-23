// Components
import HospitalCheckingRatingForm from "../FormsForNewEntry/HospitalCheckingRatingForm"
import HospitalEntryForm from "../FormsForNewEntry/HospitalEntryForm"
import OccupationalHealthcareForm from "../FormsForNewEntry/OccupationalHealthcareForm"

// Services
import { Patient } from "../../services/types"

interface Props {
	entryType: string
	patient: Patient | undefined
	setToggleFormEntry: React.Dispatch<React.SetStateAction<Boolean>>
}

export default function EspecifcForm({ entryType, patient, setToggleFormEntry }: Props) {
	if (entryType === "HospitalEntry") {
		return <HospitalEntryForm patient={patient} setToggleFormEntry={setToggleFormEntry} />
	} else if (entryType === "HospitalCheckingRating") {
		return <HospitalCheckingRatingForm patient={patient} setToggleFormEntry={setToggleFormEntry} />
	} else if (entryType === "OccupationalHealthcare") {
		return <OccupationalHealthcareForm setToggleFormEntry={setToggleFormEntry} patient={patient} />
	}
}
