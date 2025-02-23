import { useState } from "react"
import { Input, Divider, Button } from "@mui/material"

// Components
import MenuSelect from "../MenuSelect/MenuSelect"

// Hooks
import useInput from "../../hooks/useInput"

// Services
import { addNewEntry } from "../../services/patients"
import { Patient } from "../../services/types"

interface Props {
	patient: Patient | undefined
	setToggleFormEntry: React.Dispatch<React.SetStateAction<Boolean>>
}

export default function HospitalEntryForm({ patient, setToggleFormEntry }: Props) {
	const [codes, setCodes] = useState<String[]>([])
	const date = useInput("date")
	const description = useInput("description")
	const specialist = useInput("specialist")

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()

		const newEntry = {
			date: date.value,
			type: "Hospital",
			specialist: specialist.value,
			diagnosisCodes: codes,
			description: description.value,
		}

		patient && addNewEntry(newEntry, patient!.id)
	}

	function handleCancel() {
		setToggleFormEntry(false)
	}

	return (
		<div className="formNewEntry">
			<form onSubmit={handleSubmit}>
				<Input {...description} name="description" autoComplete="true" margin="dense" placeholder="Description" className="input" required />

				<p id="labelDate">Date Entry</p>

				<Input {...date} name="date" type="date" className="input" required />

				<Input {...specialist} name="specialist" type="text" placeholder="Specialist" className="input" required />

				<Divider id="divider" />

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
