import { Button } from "@mui/material"

interface Props {
	setToggleFormEntry: React.Dispatch<React.SetStateAction<Boolean>>
}

export default function ButtonAddEntrie({ setToggleFormEntry }: Props) {
	function btnClicked() {
		setToggleFormEntry(true)
	}

	return (
		<Button onClick={btnClicked} variant="contained" size="small">
			Add New Entry
		</Button>
	)
}
