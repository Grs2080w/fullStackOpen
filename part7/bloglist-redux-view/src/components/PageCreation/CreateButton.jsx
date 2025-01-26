import PropTypes from "prop-types"

export default function CreateButton({ setToggleCreateBlog, toggleCreateBlog }) {
	CreateButton.propTypes = {
		setToggleCreateBlog: PropTypes.func,
		toggleCreateBlog: PropTypes.bool,
	}

	let buttonCreate = "border-2 border-green-400 rounded-md p-1 hover:bg-green-400 hover:text-white cursor-pointer mb-5"

	return (
		<button className={buttonCreate} id="create-button" style={toggleCreateBlog ? { display: "none" } : { display: "block" }} onClick={() => setToggleCreateBlog(!toggleCreateBlog)}>
			{toggleCreateBlog ? "" : "Create new blog"}
		</button>
	)
}
