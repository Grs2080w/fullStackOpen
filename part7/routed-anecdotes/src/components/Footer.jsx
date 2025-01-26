export default function Footer() {
	const footer = {
		color: "black",
		fontSize: 16,
		marginTop: "4em",
	}

	return (
		<div style={footer}>
			Anecdote app for <a href="https://fullstackopen.com/">Full Stack Open</a>. See{" "}
			<a target="_blank" rel="noopener noreferrer" href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js">
				https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js
			</a>{" "}
			for the source code.
		</div>
	)
}
