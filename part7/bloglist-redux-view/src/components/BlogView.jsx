import Loader from "./loaders/loader"
import { useSelector, useDispatch } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

import BlogsLogged from "./Authentication/BlogLogged"
import { setNewNotification } from "../reducers/notificationReducer"
import { initialBlogs, deleteOldBlog } from "../reducers/blogReducer"

import { setRed } from "../reducers/redReducer"
import { addNewComment } from "../services/blogs"

export default function BlogView() {
	const id = useParams().id

	const [blog, setBlog] = useState(null)
	const [comments, setComments] = useState(blog ? blog.comments : [])

	const blogs = useSelector((state) => state.blog)
	const user = useSelector((state) => state.user)

	const dispatch = useDispatch()
	const navigate = useNavigate()

	useEffect(() => {
		blog === null && initialBlogs(user, dispatch)
	}, [blog])

	useEffect(() => {
		if (blogs) {
			const blog = blogs.find((blog) => blog.id === id)
			setBlog(blog)
		} else {
			return null
		}
	}, [blogs])

	useEffect(() => {
		if (blog) {
			setComments(blog.comments)
		}
	}, [blog])

	function clickLikeButton(blog) {
		dispatch({ type: "likes/addLike", payload: { blog, user } })

		setTimeout(() => {
			setNewNotification("liked " + blog.title, dispatch)
			initialBlogs(user, dispatch)
		}, 500)
	}

	function updateAtualBlogs() {
		initialBlogs(user, dispatch)
	}

	async function clickButtonDelete() {
		if (window.confirm("are you sure you want to delete this blog?")) {
			deleteOldBlog(blog, user, dispatch)
			updateAtualBlogs()
			navigate("/")

			setTimeout(() => {
				setRed(dispatch)
				setNewNotification("deleted " + blog.title, dispatch)
			}, 600)
		} else {
			setNewNotification("deletion canceled", dispatch)
			dispatch({ type: "red/setRed" })
		}
	}

	function addComment(e, blog, user) {
		e.preventDefault()

		addNewComment(blog, e.target.comment.value, user).then((response) => {
			updateAtualBlogs()
			e.target.comment.value = ""
		})
	}

	let styleLabel = "bg-emerald-200 mr-2 px-2 rounded-md mb-1"
	let styleLikeButton = "bg-yellow-200 ml-2 px-2 rounded-md hover:bg-amber-300 active:bg-amber-400 mt-2"

	let styleDeleteButton = "border-2 border-red-400 rounded-md p-0.5 hover:bg-red-400 hover:text-white cursor-pointer mt-3"

	let imputStyle = "border-gray-400 border-[2.5px] rounded-md hover:border-gray-950 hover:outline-[1px] p-[1px] pl-2 m-[2px]"

	return !blog ? (
		<Loader />
	) : (
		<>
			<BlogsLogged />

			<h2 className="text-3xl mb-3 font-bold">Blog App</h2>

			<div className="inline-flex">
				<label className={styleLabel} htmlFor="title">
					Title:{" "}
				</label>
				<p id="title">{blog.title}</p>
			</div>

			<div>
				<label className={styleLabel} htmlFor="">
					url:
				</label>
				<a className="hover:text-blue-400 hover:underline" href={blog.url} target="_blank" rel="noopener noreferrer">
					{blog.url}
				</a>{" "}
			</div>

			<div>
				<label className={styleLabel} htmlFor="">
					Author:{" "}
				</label>
				{blog.user.name}
			</div>

			<div>
				{blog.likes} likes
				<button className={styleLikeButton} onClick={() => clickLikeButton(blog)}>
					Give your like 👍
				</button>
			</div>

			{blog.user.username === user.username && (
				<button className={styleDeleteButton} onClick={() => clickButtonDelete()}>
					delete
				</button>
			)}

			<div>
				<h3 className="text-2xl font-bold mt-5">Comments</h3>

				<form style={{ marginBottom: "10px" }} onSubmit={(e) => addComment(e, blog, user)}>
					<input placeholder="Put Your Opinion" className={imputStyle} type="text" name="comment" id="" />
					<button className="bg-blue-200 ml-2 p-1 px-2 rounded-md hover:bg-blue-300 active:bg-blue-400" type="submit">
						Add
					</button>
				</form>

				{comments.map((comment, index) => (
					<li key={index}>
						{comment.comment} <br />
					</li>
				))}
			</div>
		</>
	)
}
