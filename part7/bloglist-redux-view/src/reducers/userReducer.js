import { createSlice } from "@reduxjs/toolkit"
import { setNewNotification } from "./notificationReducer"

import loginService from "../services/login"

export const userLoginAsync = async (username, password, dispatch) => {
	const user = await loginService.login({ username, password }).catch(() => {
		setNewNotification("wrong username or password", dispatch)
	})

	user && dispatch(setUser(user))
}

const initialState = () => {
	let user = window.localStorage.getItem("loggedBlogappUser")
	if (user) {
		return JSON.parse(user)
	} else {
		return null
	}
}

const userSlice = createSlice({
	name: "user",
	initialState: initialState(),
	reducers: {
		setUser(state, { payload }) {
			window.localStorage.setItem("loggedBlogappUser", JSON.stringify(payload))
			return payload
		},
	},
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
