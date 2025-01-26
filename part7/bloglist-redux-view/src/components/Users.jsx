import { Link } from "react-router"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

// Components
import BlogsLogged from "./Authentication/BlogLogged"

// Actions
import { setUsers } from "../reducers/usersReducer"

export default function Users() {
	const dispatch = useDispatch()

	useEffect(() => {
		setUsers(dispatch)
	}, [])

	const users = useSelector((state) => state.users)

	let styleLink = "hover:bg-gray-200 p-2 rounded-md"
	let styleTH = "p-2 border-b-3 rounded-l-md"

	return (
		<>
			<BlogsLogged />

			<table>
				<tbody className="text-center">
					<tr>
						<th className={styleTH}> User </th>
						<th className={styleTH}> Blogs created </th>
					</tr>

					{users.map((user) => {
						return (
							<tr key={user.id}>
								<td className="p-2">
									<Link className={styleLink} to={`/users/${user.id}`}>
										{user.name}
									</Link>
								</td>
								<td>{user.blogs.length}</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</>
	)
}
