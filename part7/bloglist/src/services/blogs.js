import axios from "axios"
const baseUrl = "http://localhost:3003/api/blogs"

export const getAll = async ({ token }) => {
	let tokenModified = "Bearer " + token

	const request = await axios.get(baseUrl, {
		headers: { Authorization: tokenModified },
	})
	return request.data
}

export async function createNewBlog(newBlog, { token }) {
	let tokenModified = "Bearer " + token

	return await axios.post(baseUrl, newBlog, { headers: { Authorization: tokenModified } }).catch((error) => console.log(error))
}

export async function likeButton(blog, { token }) {
	let newBlog = {
		title: blog.title,
		author: blog.author,
		url: blog.url,
		likes: blog.likes + 1,
		user: blog.user.id,
	}

	let tokenModified = "Bearer " + token

	return await axios.put(`${baseUrl}/${blog.id}`, newBlog, { headers: { Authorization: tokenModified } })
}

export async function deleteBlog(blog, { token }) {
	let tokenModified = "Bearer " + token

	return await axios.delete(`${baseUrl}/${blog.id}`, { headers: { Authorization: tokenModified } })
}
