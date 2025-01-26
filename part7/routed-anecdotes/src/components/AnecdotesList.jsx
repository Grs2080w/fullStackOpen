import PropTypes from "prop-types"
import { Link } from "react-router-dom"

export default function AnecdoteList({ anecdotes }) {
	AnecdoteList.propTypes = {
		anecdotes: PropTypes.array,
	}

	return (
		<div>
			<h2>Anecdotes</h2>
			<ul>
				{anecdotes.map((anecdote) => (
					<Link key={anecdote.id} to={`/anecdotes/${anecdote.id}`}>
						<li>{anecdote.content}</li>
					</Link>
				))}
			</ul>
		</div>
	)
}
