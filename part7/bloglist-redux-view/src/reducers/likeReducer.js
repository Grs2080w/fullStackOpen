import { createSlice } from "@reduxjs/toolkit"
import { likeButton } from "../services/blogs"

const likeSlice = createSlice({
	name: "likes",
	initialState: 0,
	reducers: {
		addLike(state, { payload }) {
			likeButton(payload.blog, payload.user).then((blog) => blog)
			return state
		},
	},
})

export const { addLike } = likeSlice.actions
export default likeSlice.reducer
