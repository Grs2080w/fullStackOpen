import { useMutation, useQuery } from "@apollo/client"
import PropTypes from "prop-types"

// React
import { useEffect } from "react"
import { useNavigate } from "react-router"

// Services
import { RECOMMENDED, GET_ALL_BOOKS } from "../services/gqlS"


export default function Recommended({ user, setUser }) {
	Recommended.propTypes = {
		user: PropTypes.string,
		setUser: PropTypes.func,
	}

	const navigate = useNavigate()

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

	const [getRecommended, { loading, error, data }] = useMutation(RECOMMENDED)

	useEffect(() => {
		getRecommended()
	}, [getRecommended])

	const {
		loading: loadingBook,
		error: errorBook,
		data: dataBook,
	} = useQuery(GET_ALL_BOOKS, {
		fetchPolicy: "cache-first",
	})

	if (loading || loadingBook) {
		return <p>loading...</p>
	}

	if (error || errorBook) {
		console.log(error, errorBook)
	}

	// Favorite Genre of the user
	let favoriteGenre = data ? data.recommend[0] : null

	// All books
	let books = dataBook.allBooks

	// Books to view based on the favorite genre user
	let booksToView = books.filter((book) => book.genres.includes(favoriteGenre))

	return (
		<div>
			<h1>Recommended</h1>
			<p>
				books in your favorite genre <b>{favoriteGenre}</b>
			</p>

			<table>
				<tbody>
					<tr>
						<th></th>
						<th>author</th>
						<th>published</th>
					</tr>
					{booksToView.map((a, index) => (
						<tr key={index}>
							<td>{a.title}</td>
							<td>{a.author.name}</td>
							<td>{a.published}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
