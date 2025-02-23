import * as React from "react"

/* Components copied from the docs and modifiqued */


// Styles
import { Theme, useTheme } from "@mui/material/styles"
import Box from "@mui/material/Box"
import OutlinedInput from "@mui/material/OutlinedInput"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import Chip from "@mui/material/Chip"

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 15
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 100,
		},
	},
}

const names = ["M24.2", "M51.2", "S03.5", "J10.1", "J06.9", "Z57.1", "N30.0", "H54.7", "J03.0", "L60.1", "Z74.3", "L20", "F43.2", "S62.5", "H35.2"]

function getStyles(name: string, personName: readonly string[], theme: Theme) {
	return {
		fontWeight: personName.includes(name) ? theme.typography.fontWeightMedium : theme.typography.fontWeightRegular,
	}
}

interface Props {
	setCodes: React.Dispatch<React.SetStateAction<String[]>>
	codes: String[]
}

export default function MultipleSelectChip({ setCodes, codes }: Props) {
	const theme = useTheme()
	const [personName, _setPersonName] = React.useState<string[]>([])

	const handleChange = (event: SelectChangeEvent<typeof codes>) => {
		const {
			target: { value },
		} = event
		setCodes(
			// On autofill we get a stringified value.
			typeof value === "string" ? value.split(",") : value
		)
	}

	return (
		<div>
			<FormControl sx={{ m: 1, width: 300 }}>
				<InputLabel id="demo-multiple-chip-label">Codes</InputLabel>
				<Select
					fullWidth
					labelId="demo-multiple-chip-label"
					id="demo-multiple-chip"
					multiple
					value={codes}
					onChange={handleChange}
					input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
					renderValue={(selected) => (
						<Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
							{selected.map((value, index) => (
								<Chip key={index} label={value} />
							))}
						</Box>
					)}
					MenuProps={MenuProps}
				>
					{names.map((name) => (
						<MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
							{name}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	)
}
