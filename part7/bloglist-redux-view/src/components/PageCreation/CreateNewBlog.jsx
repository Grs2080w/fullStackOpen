import { useDispatch } from "react-redux"
import PropTypes from "prop-types"

// Actions
import { addBlog } from "../../reducers/blogReducer"
import { setNewNotification } from "../../reducers/notificationReducer"
import { initialBlogs } from "../../reducers/blogReducer"

// hook
import useField from "../../hooks/useFiled"

export default function CreateNewBlog({ user, setToggleCreateBlog }) {
	CreateNewBlog.propTypes = {
		user: PropTypes.object.isRequired,
		setToggleCreateBlog: PropTypes.func,
	}

	const title = useField("title")
	const author = useField("author")
	const url = useField("url")

	const dispatch = useDispatch()

	function updateAtualBlogs() {
		initialBlogs(user, dispatch)
	}

	function clickCreateBlog(title, author, url, user) {
		let newBlog = {
			title,
			author,
			url,
			likes: 0,
		}

		addBlog(newBlog, user, dispatch)
		setTimeout(() => updateAtualBlogs(), 600)
		setNewNotification("a new blog " + title + " by " + author + " added", dispatch)
		setToggleCreateBlog(false)
	}

	let imputStyle = "border-gray-400 border-[2.5px] rounded-md hover:border-gray-950 hover:outline-[1px] p-[1px] pl-2 m-[2px]"

	let styleButtonCreate = "border-2 border-green-400 rounded-md p-1 hover:bg-green-400 hover:text-white cursor-pointer mr-1 font"

	let styleButtonCancel = "border-2 border-red-400 rounded-md p-1 hover:bg-red-400 hover:text-white cursor-pointer"

	return (
		<div className="mb-8">
			<h1 className="text-3xl font-bold mb-2">Create New</h1>

			<div>
				<input className={imputStyle} placeholder="Title" {...title} type="text" name="" id="title" /> <br />
				<input className={imputStyle} placeholder="Author" {...author} type="text" name="" id="author" /> <br />
				<input className={imputStyle} placeholder="Url" {...url} type="text" name="" id="url" /> <br />
				<br />
				<div className="inline-flex">
					<button className={styleButtonCreate} id="create-buttonInsideForm" onClick={() => clickCreateBlog(title.value, author.value, url.value, user)}>
						Create
					</button>
					<br />
					<button className={styleButtonCancel} onClick={() => setToggleCreateBlog(false)}>
						Cancel
					</button>
				</div>
				<br />
			</div>
		</div>
	)
}
