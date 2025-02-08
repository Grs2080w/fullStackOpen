import { BrowserRouter, Routes, Route, Link } from "react-router"
import { useState } from "react"

// Components
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import Login from "./components/Login"
import Recommended from "./components/Recommended"

// Services
import { useSubscription } from "@apollo/client"
import { BOOK_ADDED, GET_ALL_BOOKS } from "./services/gqlS"

const updateCache = (cache, query, bookAdded) => {
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

	cache.updateQuery({ query: GET_ALL_BOOKS }, (data) => {
		if (!data?.allBooks) return { allBooks: [bookAdded] }

		const updatedBooks = removeDuplicateBooks([...data.allBooks, bookAdded])

		return {
			allBooks: updatedBooks,
		}
	})
}

const App = () => {
	const [user, setUser] = useState(window.localStorage.getItem("loggedBlogappUser"))

	function handleLogout() {
		window.localStorage.clear()
		setUser(null)
	}

	useSubscription(BOOK_ADDED, {
		onData: ({ data, client }) => {
			window.alert(`New Book ${data.data.bookAdded.title} Added by ${data.data.bookAdded.author.name}`)
			updateCache(client.cache, { query: GET_ALL_BOOKS }, data.data.bookAdded)
		},
	})

	return (
		<BrowserRouter>
			{user && (
				<div>
					<Link to="/authors">
						<button>authors</button>
					</Link>
					<Link to="/books">
						<button>books</button>
					</Link>
					<Link to={"/recommended"}>
						<button>Recomended</button>
					</Link>
					<Link to="/add">
						<button>add book</button>
					</Link>
					<button onClick={handleLogout}>logout</button>
				</div>
			)}

			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/authors" element={<Authors user={user} setUser={setUser} />} />
				<Route path="/books" element={<Books user={user} setUser={setUser} />} />
				<Route path="/add" element={<NewBook user={user} setUser={setUser} />} />
				<Route path="/recommended" element={<Recommended user={user} setUser={setUser} />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
