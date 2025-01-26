import PropTypes from "prop-types"
import { Link } from "react-router"

export default function ReturnBlogs({ blogs }) {
	ReturnBlogs.propTypes = {
		blogs: PropTypes.array.isRequired,
	}

	let blogSorted = [...blogs].sort((a, b) => b.likes - a.likes)

	let styleBlog = "bg-gray-400 te p-3 rounded-lg hover:bg-gray-500 text-white cursor-pointer mb-1"

	return (
		<ul style={{ paddingLeft: "0px" }}>
			{blogSorted.map((blog, index) => {
				return (
					<Link key={index} to={`/blogs/${blog.id}`}>
						<div className={styleBlog}>{blog.title}</div>
					</Link>
				)
			})}
		</ul>
	)
}
