import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

// services
import { getAll } from "./services/blogs"

// components
import Blog from "./components/Blog"
import CreateNewBlog from "./components/CreateNewBlog"

// style
import "./style.css"

// action
import { userLoginAsync } from "./reducers/userReducer"
import { setNewNotification } from "./reducers/notificationReducer"
import { initialBlogs } from "./reducers/blogReducer"

const App = () => {
	const dispatch = useDispatch()

	const [password, setPassword] = useState("")
	const [username, setUsername] = useState("")
	const [red, setRed] = useState(false)
	const [toggleCreateBlog, setToggleCreateBlog] = useState(false)

	const notification = useSelector((state) => state.notification)
	const blog = useSelector((state) => state.blog)
	const user = useSelector((state) => state.user)

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
		if (notification !== "") {
			setTimeout(() => {
				dispatch(setNewNotification(""))
			}, 5000)
		}
	}, [notification])

	useEffect(() => {
		if (red) {
			setTimeout(() => {
				setRed(false)
				dispatch(setNewNotification(""))
			}, 6000)
		}
	}, [red])

	function updateAtualBlogs() {
		initialBlogs(user, dispatch)
	}

	function handleLogin() {
		userLoginAsync(username, password, dispatch)

		setUsername("")
		setPassword("")
	}

	function handleLogout() {
		window.localStorage.clear()
		//setUser(null)
		dispatch({ type: "user/setUser", payload: null })
	}

	function formLogin() {
		return (
			<div>
				<h1 className="login">log in to application</h1>
				{notification && !user && <div id="notificationRed">{notification}</div>} <br />
				<div>
					username
					<input onChange={({ target }) => setUsername(target.value)} value={username} type="text" name="" id="username" />
				</div>
				<div>
					password
					<input onChange={({ target }) => setPassword(target.value)} value={password} type="password" name="" id="password" />
				</div>
				<button
					id="login-button"
					onClick={() => {
						handleLogin()
					}}
				>
					login
				</button>
			</div>
		)
	}

	function returnFormCreateBlog() {
		return <CreateNewBlog user={user} setToggleCreateBlog={setToggleCreateBlog} updateAtualBlogs={updateAtualBlogs} />
	}

	function blogsLogged() {
		let blogSorted = [...blog].sort((a, b) => b.likes - a.likes)

		let style = {
			border: "3px solid black",
			borderradius: "5px",
			padding: "5px",
			margin: "5px",
			listStyleType: "none",
			marginLeft: "0%",
		}

		return (
			<div>
				<h1>Blogs</h1>
				{notification && user && <div id={red ? "notificationRed" : "notificationGreen"}>{notification}</div>}
				<p>
					{user.name} logged in{" "}
					<button id="buttonLogout" onClick={() => handleLogout()}>
						logout
					</button>
				</p>
				<button id="create-button" style={toggleCreateBlog ? { display: "none" } : { display: "block" }} onClick={() => setToggleCreateBlog(!toggleCreateBlog)}>
					{toggleCreateBlog ? "" : "create new blog"}
				</button>
				{toggleCreateBlog && returnFormCreateBlog()}
				<br />
				<br />

				<ul style={{ paddingLeft: "0px" }}>
					{blogSorted.map((blog, index) => {
						return (
							<li style={style} key={index}>
								<Blog blog={blog} user={user} updateAtualBlogs={updateAtualBlogs} setRed={setRed} index={index} />
							</li>
						)
					})}
				</ul>
			</div>
		)
	}

	return <div>{user === null ? formLogin() : blogsLogged()}</div>
}

export default App
