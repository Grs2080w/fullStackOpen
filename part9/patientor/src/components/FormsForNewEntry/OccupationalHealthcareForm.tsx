import { Input, Divider, Button } from "@mui/material"
import MenuSelect from "../MenuSelect/MenuSelect"
import { useState } from "react"

import useInput from "../../hooks/useInput"
import { addNewEntry } from "../../services/patients"
import { Patient } from "../../services/types"

interface Props {
	patient: Patient | undefined
	setToggleFormEntry: React.Dispatch<React.SetStateAction<Boolean>>
}

export default function OccupationalHealthcareForm({ patient, setToggleFormEntry }: Props) {
	const [codes, setCodes] = useState<String[]>([])
	const description = useInput("description")
	const date = useInput("date")
	const specialist = useInput("specialist")
	const employerName = useInput("employerName")
	const startDate = useInput("dateStart")
	const endDate = useInput("dateEnd")

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()

		const newEntry = {
			date: date.value,
			specialist: specialist.value,
			type: "OccupationalHealthcare",
			employerName: employerName.value,
			sickLeave: {
				startDate: startDate.value,
				endDate: endDate.value,
			},
			diagnosisCodes: codes,
			description: description.value,
		}

		addNewEntry(newEntry, patient!.id)
	}

	function handleCancel() {
		setToggleFormEntry(false)
	}

	return (
		<div className="formNewEntry">
			<form onSubmit={handleSubmit}>
				<Input {...description} autoComplete="true" margin="dense" placeholder="Description" className="input" />

				<Input {...specialist} type="text" placeholder="Specialist" className="input" />

				<Input {...date} type="date" placeholder="date" className="input" />

				<Input {...employerName} type="text" placeholder="Employer Name" className="input" />

				<p id="labelDate">Date Start Entry</p>
				<Input {...startDate} type="date" placeholder="Employer Name" className="input" />

				<p id="labelDate">Date End Entry</p>
				<Input {...endDate} type="date" placeholder="Employer Name" className="input" />

				<MenuSelect setCodes={setCodes} codes={codes} />

				<Divider id="divider" />

				<div id="divButtonsEntry">
					<Button variant="contained" type="submit">
						Add
					</Button>
					<Button onClick={handleCancel} variant="outlined" color="error">
						Cancel
					</Button>
				</div>
			</form>
		</div>
	)
}
