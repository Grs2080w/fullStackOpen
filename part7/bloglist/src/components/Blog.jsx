import { useState } from "react"
import PropTypes from "prop-types"

import { useDispatch } from "react-redux"
import { setNewNotification } from "../reducers/notificationReducer"
import { deleteOldBlog } from "../reducers/blogReducer"

export default function Blog({ user, updateAtualBlogs, setRed, index, blog }) {
	Blog.propTypes = {
		user: PropTypes.object.isRequired,
		updateAtualBlogs: PropTypes.func,
		setRed: PropTypes.func,
		index: PropTypes.number,
		blog: PropTypes.object.isRequired,
		index: PropTypes.number,
	}

	const [blogVisible, setBlogVisible] = useState(false)

	const dispatch = useDispatch()

	let idButtonView = "viewButton" + index
	let idButtonDelete = "deleteButton" + index
	let idButtonLike = "likeButton" + index
	let idButtonHide = "hideButton" + index

	async function clickLikeButton(blog) {
		dispatch({ type: "likes/addLike", payload: { blog, user } })

		setTimeout(() => {
			dispatch(setNewNotification("liked " + blog.title))
			updateAtualBlogs()
		}, 500)
	}

	async function clickButtonDelete() {
		if (window.confirm("are you sure you want to delete this blog?")) {
			deleteOldBlog(blog, user, dispatch)

			setTimeout(() => {
				setRed(true)
				dispatch(setNewNotification("deleted " + blog.title))
				updateAtualBlogs()
			}, 600)
		} else {
			dispatch(setNewNotification("deletion canceled"))
			setRed(true)
		}
	}

	function returnDeleteButton() {
		return (
			<div>
				<button id={idButtonDelete} onClick={() => clickButtonDelete()}>
					delete
				</button>
			</div>
		)
	}

	return (
		<>
			{blogVisible === false ? (
				<>
					{blog.title} {blog.author}{" "}
					<button
						id={blogVisible ? idButtonHide : idButtonView}
						onClick={() => {
							setBlogVisible(true)
						}}
					>
						{blogVisible ? "hide" : "view"}
					</button>
				</>
			) : (
				<>
					title: {blog.title}{" "}
					<button
						id={idButtonView}
						onClick={() => {
							setBlogVisible(false)
						}}
					>
						{blogVisible ? "hide" : "view"}
					</button>{" "}
					<br />
					url: {blog.url} <br />
					likes: {blog.likes}{" "}
					<button
						id={idButtonLike}
						onClick={() => {
							clickLikeButton(blog, user)
						}}
					>
						like
					</button>
					<br />
					name: {blog.user.name} <br />
					<br />
					{user.username === blog.user.username && returnDeleteButton()}
				</>
			)}
		</>
	)
}
