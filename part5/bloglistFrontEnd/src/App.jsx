import { useState, useEffect } from "react"
import { getAll } from "./services/blogs"
import loginService from "./services/login"
import Blog from "./components/Blog"
import CreateNewBlog from "./components/CreateNewBlog"
//import './style.css'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [user, setUser] = useState(null)
	const [password, setPassword] = useState("")
	const [username, setUsername] = useState("")
	const [message, setMessage] = useState(null)
	const [notification, setNotification] = useState(false)
	const [red, setRed] = useState(false)
	const [toggleCreateBlog, setToggleCreateBlog] = useState(false)

	useEffect(() => {
		if (user !== null) {
			getAll(user).then((blogs) => setBlogs(blogs))
		}
	}, [user])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
		}
	}, [])

	useEffect(() => {
		if (notification) {
			setTimeout(() => {
				setNotification(false)
				setMessage(null)
			}, 5000)
		}
	}, [notification])

	useEffect(() => {
		if (red) {
			setTimeout(() => {
				setRed(false)
				setMessage(null)
			}, 6000)
		}
	}, [red])

	function updateAtualBlogs() {
		getAll(user).then((blogs) => setBlogs(blogs))
	}

	function handleLogin() {
		loginService
			.login({ username, password })
			.then((user) => {
				window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user))

				setUser(user)
				setUsername("")
				setPassword("")
			})
			.catch(() => {
				setUsername("")
				setPassword("")
				setMessage("wrong username or password")
				setNotification(true)
			})
	}

	function handleLogout() {
		window.localStorage.clear()
		setUser(null)
	}

	function formLogin() {
		return (
			<div>
				<h1 className="login">log in to application</h1>
				{notification && !user && <div id="notificationRed">{message}</div>} <br />
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
		return <CreateNewBlog user={user} setMessage={setMessage} setNotification={setNotification} setToggleCreateBlog={setToggleCreateBlog} updateAtualBlogs={updateAtualBlogs} />
	}

	function blogsLogged() {
		let blogSorted = blogs.sort((a, b) => b.likes - a.likes)

		return (
			<div>
				<h1>Blogs</h1>

				{notification && user && <div id={red ? "notificationRed" : "notificationGreen"}>{message}</div>}

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

				{blogSorted.map((blog, index) => (
					<Blog key={blog.id} blog={blog} setMessage={setMessage} setNotification={setNotification} user={user} updateAtualBlogs={updateAtualBlogs} setRed={setRed} index={index} />
				))}
			</div>
		)
	}

	return <div>{user === null ? formLogin() : blogsLogged()}</div>
}

export default App
