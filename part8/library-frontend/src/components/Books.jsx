import { useQuery } from "@apollo/client"
import PropTypes from "prop-types"

// Services
import { GET_ALL_BOOKS } from "../services/gqlS"

// React
import { useState, useEffect } from "react"
import { useNavigate } from "react-router"

export default function Books({ user, setUser }) {
	Books.propTypes = {
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

	function removeDuplicateBooks(books) {
		var uniqueTitles = []
		return books.filter(function (book) {
			if (uniqueTitles.indexOf(book.title) === -1) {
				uniqueTitles.push(book.title)
				return true
			}
			return false
		})
	}

	const { loading, error, data } = useQuery(GET_ALL_BOOKS, {
		fetchPolicy: "cache-first",
	})

	// Set the array contain the books according to the genre selected by the user
	const [bookGenre, setBookGenre] = useState(null)

	if (loading) {
		return <div>loading...</div>
	}

	if (error) {
		console.log(error)
	}

	let books = data.allBooks
	// This is a copy of the original array to be manipuled on user screen
	let booksToView = data.allBooks

	let genreBooks = books.map((book) => {
		let genres = book.genres
		return genres.map((genre) => {
			return genre
		})[0]
	})

	genreBooks = Array.from(new Set(genreBooks))

	function handleClick(e) {
		let booksFilteres = books.filter((book) => e.target.innerText === book.genres[0])
		setBookGenre(booksFilteres)
	}

	bookGenre !== null ? (booksToView = bookGenre) : books

	booksToView = removeDuplicateBooks(booksToView)

	return (
		<div>
			<h2>books</h2>

			<div>
				<b>{bookGenre !== null ? `in genre ${bookGenre[0].genres[0]}` : ""}</b>
			</div>

			<br />

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

			<br />

			<div>
				{genreBooks.map((genre) => (
					<button key={genre} onClick={(e) => handleClick(e)}>
						{genre}
					</button>
				))}
				<button onClick={() => setBookGenre(null)}>all books</button>
			</div>
		</div>
	)
}
