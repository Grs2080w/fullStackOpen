import { useNavigate } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router"
import Loader from "../loaders/loader"

export default function BlogsLogged() {
	const user = useSelector((state) => state.user)
	const notification = useSelector((state) => state.notification)
	const red = useSelector((state) => state.red)

	const dispatch = useDispatch()
	const navigate = useNavigate()

	function handleLogout() {
		window.localStorage.clear()
		dispatch({ type: "user/setUser", payload: null })
		navigate("/")
	}

	let styleLink = "text-white mr-2 hover:underline hover:text-cyan-700"
	let styleButtonLogoout = "text-black border-2 border-red-400 rounded-md p-1 hover:bg-red-400 hover:text-white cursor-pointer"

	if (!user) {
		return <Loader />
	} else {
		return (
			<div className="mb-3">
				<h1 className="text-3xl font-bold">Blogs</h1>

				{notification && user && <div className="my-5" id={red ? "notificationRed" : "notificationGreen"}>{notification}</div>}

				<div className="flex justify-between">
					<div className="my-2 bg-gray-900 p-3 w-min rounded-md">
						<Link className={styleLink} to="/">
							blogs
						</Link>
						<Link className={styleLink} style={{ marginRight: "5px" }} to="/users">
							users
						</Link>
					</div>
					<div className="w-fit ml-2 h-fit">
						{user.name} logged in{" "}
						<button className={styleButtonLogoout} id="buttonLogout" onClick={() => handleLogout()}>
							logout
						</button>
					</div>
				</div>
			</div>
		)
	}
}
