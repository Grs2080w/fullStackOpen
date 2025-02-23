import React, { useState } from "react"

export default function useInput(name: string) {
	const [value, setValue] = useState<String>("")

	const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setValue(e.target.value)
	}

	return {
		value,
		onChange,
		name,
	}
}
