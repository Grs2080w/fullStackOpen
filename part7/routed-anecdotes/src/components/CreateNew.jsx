import PropTypes from "prop-types"
import { useNavigate } from "react-router-dom"

import { useField } from "../hooks"

export default function CreateNew({ anecdotes, setAnecdotes, setNotification }) {
	CreateNew.propTypes = {
		anecdotes: PropTypes.array.isRequired,
		setAnecdotes: PropTypes.func.isRequired,
		setNotification: PropTypes.func.isRequired,
	}

	const content = useField("content")
	const author = useField("author")
	const info = useField("info")

	const navigate = useNavigate()

	const handleSubmit = (e) => {
		e.preventDefault()

		let id = Math.round(Math.random() * 1000)

		let content = e.target.content.value
		let author = e.target.author.value
		let info = e.target.info.value

		let newAnecdote = { content, author, info, id, votes: 0 }

		setAnecdotes(anecdotes.concat(newAnecdote))
		navigate("/")
		setNotification(`a new anecdote ${content} created`)
	}

	function handleReset(e) {
		e.preventDefault()

		content.onReset()
		author.onReset()
		info.onReset()
	}

	return (
		<div>
			<h2>create a new anecdote</h2>
			<form onReset={handleReset} onSubmit={handleSubmit}>
				<div>
					content
					<input {...content} />
				</div>
				<div>
					author
					<input {...author} />
				</div>
				<div>
					url for more info
					<input {...info} />
				</div>
				<button>create</button>
				<button type="reset">reset</button>
			</form>
		</div>
	)
}
