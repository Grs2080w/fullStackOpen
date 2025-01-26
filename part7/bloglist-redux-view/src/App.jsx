import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

// components
import CreateNewBlog from "./components/PageCreation/CreateNewBlog"
import FormLogin from "./components/Authentication/FormLogin"
import BlogsLogged from "./components/Authentication/BlogLogged"
import CreateButton from "./components/PageCreation/CreateButton"
import ReturnBlogs from "./components/Blogs/ReturnBlogs"

// actions
import { setNewNotification } from "./reducers/notificationReducer"
import { initialBlogs } from "./reducers/blogReducer"

const App = () => {
	const dispatch = useDispatch()

	const blog = useSelector((state) => state.blog)
	const user = useSelector((state) => state.user)
	const notification = useSelector((state) => state.notification)
	const [red, setRed] = useState(false)
	const [toggleCreateBlog, setToggleCreateBlog] = useState(false)

	useEffect(() => {
		if (user !== null) {
			initialBlogs(user, dispatch)
		}
	}, [user])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")

		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			dispatch({ type: "user/setUser", payload: user })
		}
	}, [])

	useEffect(() => {
		if (notification) {
			setTimeout(() => {
				setNewNotification("", dispatch)
			}, 5000)
		}
	}, [notification])

	useEffect(() => {
		if (red) {
			setTimeout(() => {
				setRed(false)
				setNewNotification("", dispatch)
			}, 6000)
		}
	}, [red])

	function returnFormCreateBlog() {
		return <CreateNewBlog user={user} setToggleCreateBlog={setToggleCreateBlog} />
	}

	function blogsLogged() {
		return (
			<>
				<BlogsLogged notification={notification} user={user} red={red} />

				<CreateButton setToggleCreateBlog={setToggleCreateBlog} toggleCreateBlog={toggleCreateBlog} />

				{toggleCreateBlog && returnFormCreateBlog()}

				<ReturnBlogs blogs={blog} setRed={setRed} user={user} />
			</>
		)
	}

	function homePage() {
		return <div>{user === null ? <FormLogin notification={notification} user={user} /> : blogsLogged()}</div>
	}

	return homePage()
}

export default App
