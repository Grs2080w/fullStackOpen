import { configureStore } from "@reduxjs/toolkit"

// reducers
import notificationSlice from "../reducers/notificationReducer"
import blogSlice from "../reducers/blogReducer"
import likeSlice from "../reducers/likeReducer"
import userSlice from "../reducers/userReducer"
import redSlice from "../reducers/redReducer"
import usersSlice from "../reducers/usersReducer"

const store = configureStore({
	reducer: {
		notification: notificationSlice,
		blog: blogSlice,
		likes: likeSlice,
		user: userSlice,
		red: redSlice,
		users: usersSlice,
	},
})

export { store }
