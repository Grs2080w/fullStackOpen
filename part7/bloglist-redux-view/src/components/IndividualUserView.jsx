import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { Link } from "react-router"

// Components
import BlogsLogged from "./Authentication/BlogLogged"
import Loader from "./loaders/loader"

// Actions
import { setUsers } from "../reducers/usersReducer"

export default function IndividualUserView() {
	const id = useParams().id
	const dispatch = useDispatch()
	const [user, setNewUser] = useState(null)

	useEffect(() => {
		user === null && setUsers(dispatch)
	}, [user])

	const users = useSelector((state) => state.users)

	useEffect(() => {
		if (users) {
			const user = users.find((user) => user.id === id)
			setNewUser(user)
		}
	}, [users])

	return (
		<>
			{user ? (
				<>
					<BlogsLogged />

					<h2 className="text-3xl font-bold mb-2">{user.name} </h2>

					<div className="border-b-3 mb-4 mt-4 w-70"></div>

					<h3 className="text-xl font-bold mb-2">Added blogs</h3>

					<ul>
						{user.blogs.map((blog) => (
							<li className="list-inside list-disc" key={blog.id}>
								<Link className="hover:text-cyan-700" to={`/blogs/${blog.id}`}>
									{blog.title}
								</Link>
							</li>
						))}
					</ul>
				</>
			) : (
				<Loader />
			)}
		</>
	)
}
