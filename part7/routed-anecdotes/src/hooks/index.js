import { useState } from "react"

export function useField(name) {
	const [value, setValue] = useState("")

	const onChange = (event) => {
		setValue(event.target.value)
	}

	const onReset = () => {
		setValue("")
	}

	return {
		name,
		value,
		onChange,
		onReset,
	}
}
