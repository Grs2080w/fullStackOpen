import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

// Services
import { Patient } from "../../services/types"
import { getPatient } from "../../services/patients"

// Components
import Entries from "../Entries/Entries"
import ButtonAddEntrie from "../ButtonAddEntry"
import EspecifcForm from "./EspecifcForm"
import FormNewEntryTyped from "../FormNewEntry-typed"

export default function PatientComponent(): JSX.Element {
	const { id } = useParams()

	const [patient, setPatients] = useState<Patient>()
	const [entryType, setEntryType] = useState<string>("HospitalEntry")
	const [toggleFormEntry, setToggleFormEntry] = useState<Boolean>(false)

	useEffect(() => {
		getPatient(id!).then((res) => setPatients(res))
	}, [id])

	return (
		<div>
			<h3>{patient?.name}</h3>
			<div>
				<div>Ssn: {patient?.ssn} </div>
				<div>Occupation: {patient?.occupation}</div>
			</div>

			{toggleFormEntry && (
				<div>
					<FormNewEntryTyped entryType={entryType} setEntryType={setEntryType} />
					<EspecifcForm entryType={entryType} patient={patient} setToggleFormEntry={setToggleFormEntry} />
				</div>
			)}

			<h3>Entries</h3>

			{patient?.entries &&
				patient?.entries.map((entrye) => {
					return <Entries key={entrye.id} patient={patient} entry={entrye} />
				})}

			<ButtonAddEntrie setToggleFormEntry={setToggleFormEntry} />

			{!patient?.entries[0] && <p>No entries yet 😁</p>}
		</div>
	)
}
