import { useMutation } from "@apollo/client"

// React
import { useNavigate } from "react-router"
import { useEffect } from "react"

// Services
import { LOGIN_USER } from "../services/gqlS"

// A possible login is username: grs2080w, password: yeshua

export default function Login() {
	const navigate = useNavigate()
	const [loginInApp, { data }] = useMutation(LOGIN_USER)

	useEffect(() => {
		if (localStorage.getItem("loggedBlogappUser")) {
			navigate("/authors")
		}
	}, [navigate])

	useEffect(() => {
		if (data && data.login) {
			localStorage.setItem("loggedBlogappUser", data.login.value)
			navigate("/authors")
		}
	}, [data, navigate])

	function SignIn(e) {
		e.preventDefault()

		const username = e.target.username.value
		const password = e.target.password.value

		loginInApp({ variables: { username, password } })
	}

	return (
		<>
			<h2>Login</h2>

			<form onSubmit={SignIn}>
				<input type="text" name="username" placeholder="Username" /> <br />
				<input type="password" name="password" placeholder="Password" /> <br />
				<button type="submit">Sign in</button>
			</form>
		</>
	)
}
