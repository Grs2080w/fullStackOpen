import { useState } from "react"
import { Input, Divider, Button } from "@mui/material"

// Components
import MenuSelect from "../MenuSelect/MenuSelect"

// Hooks
import useInput from "../../hooks/useInput"

// Services
import { addNewEntry } from "../../services/patients"
import { Patient, HealthCheckRating } from "../../services/types"

interface Props {
	patient: Patient | undefined
	setToggleFormEntry: React.Dispatch<React.SetStateAction<Boolean>>
}

export default function HospitalCheckingRatingForm({ patient, setToggleFormEntry }: Props) {
	const date = useInput("date")
	const specialist = useInput("specialist")
	const description = useInput("description")
	const [codes, setCodes] = useState<String[]>([])
	const [ratingBar, setRatingBar] = useState<HealthCheckRating>()

	function handleRadioChange(event: React.ChangeEvent<HTMLInputElement>) {
		setRatingBar(Number(event.target.value))
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()

		const newEntry = {
			date: date.value,
			specialist: specialist.value,
			description: description.value,
			healthCheckRating: ratingBar,
			diagnosisCodes: codes,
			type: "HealthCheck",
		}

		patient && addNewEntry(newEntry, patient.id)
	}

	function handleCancel() {
		setToggleFormEntry(false)
	}

	return (
		<div className="formNewEntry">
			<form onSubmit={handleSubmit}>
				<Input {...description} autoComplete="true" margin="dense" placeholder="Description" className="input" required />

				<p id="labelDate">Date Entry</p>

				<Input {...date} type="date" className="input" required />

				<Input {...specialist} type="text" placeholder="Specialist" className="input" required />

				<div className="input">
					<p>
						<b>HealthCheck Rating</b>{" "}
					</p>
					<div>
						<input type="radio" name="healthRatingBar" value="0" id="healthRatingBar" onChange={handleRadioChange} required /> 0{" "}
					</div>
					<div>
						<input type="radio" name="healthRatingBar" value="1" id="healthRatingBar" onChange={handleRadioChange} required /> 1{" "}
					</div>
					<div>
						<input type="radio" name="healthRatingBar" value="2" id="healthRatingBar" onChange={handleRadioChange} required /> 2{" "}
					</div>
					<div>
						<input type="radio" name="healthRatingBar" value="3" id="healthRatingBar" onChange={handleRadioChange} required /> 3
					</div>
				</div>

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
