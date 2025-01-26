import { createSlice } from "@reduxjs/toolkit"
import { func } from "prop-types"
import { useDispatch, useSelector } from "react-redux"

export function setNewNotification(message) {
	return {
		type: "notification/setNotification",
		payload: message,
	}
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
