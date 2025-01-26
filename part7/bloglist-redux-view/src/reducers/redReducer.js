import { createSlice } from "@reduxjs/toolkit"

export function setRed(dispatch) {
	dispatch({ type: "red/setRedTrue" })
	setTimeout(() => {
		dispatch({ type: "red/setRedFalse" })
	}, 5000)
}

const redSlice = createSlice({
	name: "red",
	initialState: false,
	reducers: {
		setRedTrue: (state) => true,
		setRedFalse: (state) => false,
	},
})

export default redSlice.reducer
