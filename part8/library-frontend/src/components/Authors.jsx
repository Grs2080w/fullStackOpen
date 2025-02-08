import { useQuery, useMutation } from "@apollo/client"
import PropTypes from "prop-types"

// Services
import { GET_ALL_AUTHORS, CHANGE_BORN } from "../services/gqlS"

// React
import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import Select from "react-select"

export default function Authors({ user, setUser }) {
	Authors.propTypes = {
		user: PropTypes.string,
		setUser: PropTypes.func,
	}

	const navigate = useNavigate()
	const [titleToChange, setTitleToChange] = useState("")

	useEffect(() => {
		const loggedUser = localStorage.getItem("loggedBlogappUser")

		if (!loggedUser) {
			navigate("/")
			return
		}

		if (!user) {
			setUser(loggedUser)
		}
	}, [navigate, user, setUser])

	const { loading, error, data } = useQuery(GET_ALL_AUTHORS, { fetchPolicy: "cache-first" })

	const [changeBorn] = useMutation(CHANGE_BORN, {
		refetchQueries: [{ query: GET_ALL_AUTHORS }],
	})

	if (loading) {
		return <p>loading...</p>
	}
	if (error) {
		console.log(error)
	}

	const authors = data.allAuthors

	function changeBurn(e) {
		e.preventDefault()
		changeBorn({ variables: { name: titleToChange, setBornTo: parseInt(e.target.updateBorn.value) } })
		e.target.updateBorn.value = ""
	}

	return (
		<div>
			<h2>authors</h2>

			<table>
				<tbody>
					<tr>
						<th></th>
						<th>born</th>
						<th>books</th>
					</tr>
					{authors.map((a) => (
						<tr key={a.name}>
							<td>{a.name}</td>
							<td>{a.born}</td>
							<td>{a.bookCount}</td>
						</tr>
					))}
				</tbody>
			</table>

			<br />

			<Select
				placeholder="Select an author"
				options={authors.map((a) => ({
					value: a.name,
					label: `${a.name}`,
				}))}
				onChange={(e) => {
					setTitleToChange(e.value)
				}}
			/>

			<br />

			<form onSubmit={changeBurn}>
				<input type="number" name="updateBorn" id="" /> <br />
				<button type="submit">update born</button>
			</form>
		</div>
	)
}
