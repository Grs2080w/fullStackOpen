import { createSlice } from "@reduxjs/toolkit"
import { createNewBlog, deleteBlog, getAll } from "../services/blogs"

export async function initialBlogs(user, dispatch) {
	let blogs = await getAll(user)
	blogs && dispatch({ type: "blogs/setBlogs", payload: blogs })
}

export async function addBlog(blog, user, dispatch) {
	let newBlog = await createNewBlog(blog, user)
	newBlog && dispatch({ type: "blogs/setNewBlog", payload: newBlog.data })
}

export async function deleteOldBlog(blog, user, dispatch) {
	let deletedBlog = await deleteBlog(blog, user)
	deletedBlog && dispatch({ type: "blogs/removeBlog", payload: blog })
}

const blogSlice = createSlice({
	name: "blogs",
	initialState: [{}],
	reducers: {
		setBlogs(state, action) {
			return action.payload
		},

		setNewBlog(state, { payload }) {
			return [...state, payload]
		},
		removeBlog(state, { payload }) {
			return state.filter((blog) => blog.id !== payload.id)
		},
	},
})

export const { setBlogs, removeBlog, updateBlog } = blogSlice.actions
export default blogSlice.reducer
