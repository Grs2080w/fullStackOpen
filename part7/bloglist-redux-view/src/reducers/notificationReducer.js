import { createSlice } from "@reduxjs/toolkit"

export function setNewNotification(message, dispatch) {
	dispatch({
		type: "notification/setNotification",
		payload: message,
	})

	setTimeout(() => {
		clearNotification(dispatch)
	}, 5000)
}

function clearNotification(dispatch) {
	dispatch({ type: "notification/dumpNotification" })
}

const notificationSlice = createSlice({
	name: "notification",
	initialState: "",
	reducers: {
		setNotification(state, action) {
			return action.payload
		},
		dumpNotification(state, action) {
			return ""
		},
	},
})

export const { setNotification, dumpNotification } = notificationSlice.actions
export default notificationSlice.reducer
