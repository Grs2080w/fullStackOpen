import { createSlice } from "@reduxjs/toolkit"
import { setNewNotification } from "./notificationReducer"

import loginService from "../services/login"

export const userLoginAsync = async (username, password, dispatch) => {
	const user = await loginService.login({ username, password }).catch(() => {
		dispatch(setNewNotification("wrong username or password"))
	})

	user && dispatch(setUser(user))
}

const userSlice = createSlice({
	name: "user",
	initialState: null,
	reducers: {
		setUser(state, { payload }) {
			window.localStorage.setItem("loggedBlogappUser", JSON.stringify(payload))
			return payload
		},
	},
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
