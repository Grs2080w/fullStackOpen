import { Select, MenuItem, FormControl, SelectChangeEvent } from "@mui/material"

interface Props {
	entryType: string
	setEntryType: React.Dispatch<React.SetStateAction<string>>
}

export default function FormNewEntryTyped({ setEntryType, entryType }: Props) {
	const handleEntryTypeChange = (event: SelectChangeEvent<string>) => {
		setEntryType(event.target.value as string)
	}

	return (
		<div className="formNewEntry typeEntry">
			<h3>Type of entry</h3>
			<FormControl fullWidth>
				<Select labelId="entry-type-label" id="entry-type-select" value={entryType} onChange={handleEntryTypeChange}>
					<MenuItem value="HospitalEntry">Hospital Entry</MenuItem>
					<MenuItem value="HospitalCheckingRating">Hospital Checking Rating</MenuItem>
					<MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
				</Select>
			</FormControl>
		</div>
	)
}
