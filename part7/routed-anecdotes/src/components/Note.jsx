import PropTypes from "prop-types"

export default function Note({ note }) {
	Note.propTypes = {
		note: PropTypes.object,
	}

	return (
		<div>
			<h2>{note.content}</h2>
			<p>{note.author}</p>
			<p>{note.info}</p>
			<p>{note.votes} votes</p>
		</div>
	)
}
