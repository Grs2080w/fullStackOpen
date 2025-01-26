import { createNewBlog } from "../services/blogs"
import { addBlog } from "../reducers/blogReducer"
import { useDispatch } from "react-redux"
import { setNewNotification } from "../reducers/notificationReducer"

import useField from "../hooks/useFiled"

import PropTypes from "prop-types"

export default function CreateNewBlog({ user, setToggleCreateBlog, updateAtualBlogs }) {
	CreateNewBlog.propTypes = {
		user: PropTypes.object.isRequired,
		setToggleCreateBlog: PropTypes.func,
		updateAtualBlogs: PropTypes.func,
	}

	const title = useField("title")
	const author = useField("author")
	const url = useField("url")

	const dispatch = useDispatch()

	function clickCreateBlog(title, author, url, user) {
		let newBlog = {
			title,
			author,
			url,
			likes: 0,
		}

		addBlog(newBlog, user, dispatch)

		setTimeout(() => updateAtualBlogs(), 600)

		dispatch(setNewNotification("a new blog " + title + " by " + author + " added"))
		setToggleCreateBlog(false)
	}

	return (
		<div>
			<h1>Create New</h1>

			<div>
				title: <input {...title} type="text" name="" id="title" /> <br />
				author: <input {...author} type="text" name="" id="author" /> <br />
				url: <input {...url} type="text" name="" id="url" /> <br />
				<br />
				<button id="create-buttonInsideForm" onClick={() => clickCreateBlog(title.value, author.value, url.value, user)}>
					create
				</button>
				<br />
				<button onClick={() => setToggleCreateBlog(false)}>cancel</button>
				<br />
			</div>
		</div>
	)
}
