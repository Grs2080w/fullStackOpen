import { createSlice } from "@reduxjs/toolkit"
import { getUsers } from "../services/users"

export async function setUsers(dispatch) {
	await getUsers().then((users) => {
		dispatch({
			type: "users/SET_USERS",
			data: users.data,
		})
	})
}

const usersSlice = createSlice({
	name: "users",
	initialState: [],
	reducers: {
		SET_USERS(state, action) {
			return action.data
		},
	},
})

export const { SET_USERS } = usersSlice.actions
export default usersSlice.reducer
