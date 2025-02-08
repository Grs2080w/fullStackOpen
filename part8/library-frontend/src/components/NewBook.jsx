import { useMutation } from "@apollo/client"
import PropTypes from "prop-types"

// React
import { useState, useEffect } from "react"
import { useNavigate } from "react-router"

// Services
import { ADD_BOOK, GET_ALL_AUTHORS, GET_ALL_BOOKS } from "../services/gqlS"

const NewBook = ({ user, setUser }) => {
	NewBook.propTypes = {
		user: PropTypes.string,
		setUser: PropTypes.func,
	}

	const [genre, setGenre] = useState("")
	const [genres, setGenres] = useState([])

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

	// eslint-disable-next-line no-unused-vars
	const [addUser, { loading, error, data }] = useMutation(ADD_BOOK, {
		errorPolicy: "all",
		refetchQueries: [{ query: GET_ALL_BOOKS }, { query: GET_ALL_AUTHORS }],
		onError: (error) => {
			console.log("Erro de Mutation:", error)
			if (error.graphQLErrors) {
				error.graphQLErrors.forEach((graphQLError) => {
					console.log("Erro GraphQL:", graphQLError)
				})
			}
			if (error.networkError) {
				console.log("Erro de Rede:", error.networkError.message)
			}
		},
	})

	const submit = async (event) => {
		event.preventDefault()

		let title = event.target.title.value
		let author = event.target.author.value
		let published = event.target.published.value

		addUser({ variables: { title, author, published: parseInt(published), genres } })

		event.target.title.value = ""
		event.target.author.value = ""
		event.target.published.value = ""
		setGenres([])
		setGenre("")
	}


	const addGenre = () => {
		setGenres(genres.concat(genre))
		setGenre("")
	}

	return (
		<div>
			<form onSubmit={submit}>
				<label htmlFor="">Title : </label>
				<input name="title" /> <br />
				<label htmlFor="">Author : </label>
				<input name="author" /> <br />
				<label htmlFor="">Published : </label>
				<input type="number" name="published" /> <br />
				<input value={genre} onChange={({ target }) => setGenre(target.value)} />
				<button onClick={addGenre} type="button">
					add genre
				</button>
				<br />
				genres: {genres.join(" ")} <br />
				<button type="submit">create book</button>
			</form>
		</div>
	)
}

export default NewBook
