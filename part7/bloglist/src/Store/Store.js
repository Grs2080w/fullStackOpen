import { configureStore } from "@reduxjs/toolkit"

import notificationSlice from "../reducers/notificationReducer"
import blogSlice from "../reducers/blogReducer"
import likeSlice from "../reducers/likeReducer"
import userSlice from "../reducers/userReducer"

const store = configureStore({
	reducer: {
		notification: notificationSlice,
		blog: blogSlice,
		likes: likeSlice,
		user: userSlice,
	},
})

export { store }
