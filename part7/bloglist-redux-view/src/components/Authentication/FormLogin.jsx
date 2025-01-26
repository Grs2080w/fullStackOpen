import { userLoginAsync } from "../../reducers/userReducer"
import { useState } from "react"
import { useDispatch } from "react-redux"

export default function FormLogin({ notification, user }) {
	const [password, setPassword] = useState("")
	const [username, setUsername] = useState("")

	const dispatch = useDispatch()

	function handleLogin() {
		userLoginAsync(username, password, dispatch)
		setUsername("")
		setPassword("")
	}

	let imputStyle = "border-gray-400 border-[2.5px] rounded-md hover:border-gray-950 hover:outline-[1px] p-[4px] m-[2px]"

	let styleButtonLogin = "my-5 border-3 border-blue-600 rounded-md p-1 hover:bg-blue-600 hover:text-white cursor-pointer mr-1 w-[210px] outline-none"

	let styleDiv = "text-center mt-[calc(50vh-260px)] rounded-2xl shadow-2xl shadow-blue-200  xl w-fit m-auto p-12"

	let styleNotification = "text-red-600 pl-4 text-left m-auto mt-16 border-2 border-red-600 rounded-md p-1 max-w-[300px] transition duration-200 ease"

	let styleNotification2 = "pl-4 h-9 m-auto mt-16 p-1 border-2 border-white max-w-[300px]"

	return (
		<div>
			<div className={!notification ? styleNotification2 : styleNotification}> {notification} </div>

			<div className={styleDiv}>
				<h1 className="text-3xl font-bold text-center mb-6">Sign in to application</h1>
				<div>
					<input className={imputStyle} onChange={({ target }) => setUsername(target.value)} value={username} type="text" name="" id="username" placeholder="Enter Username" />
				</div>
				<div>
					<input className={imputStyle} onChange={({ target }) => setPassword(target.value)} value={password} type="password" name="" id="password" placeholder="Enter Password" />
				</div>
				<button
					className={styleButtonLogin}
					id="login-button"
					onClick={() => {
						handleLogin()
					}}
				>
					Sign in
				</button>
			</div>
		</div>
	)
}
