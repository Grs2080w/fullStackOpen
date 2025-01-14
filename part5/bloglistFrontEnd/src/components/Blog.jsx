import { useState } from "react"
import { likeButton, deleteBlog } from "../services/blogs"
import PropTypes from "prop-types"

export default function Blog({
  blog,
  setMessage,
  setNotification,
  user,
  updateAtualBlogs,
  setRed,
  index
}) {
  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    setMessage: PropTypes.func,
    setNotification: PropTypes.func,
    user: PropTypes.object.isRequired,
    updateAtualBlogs: PropTypes.func,
    setRed: PropTypes.func,
    index: PropTypes.number
  }

  const [blogVisible, setBlogVisible] = useState(false)

  let idButtonView = "viewButton" + index
  let idButtonDelete = "deleteButton" + index
  let idButtonLike = "likeButton" + index
  let idButtonHide = "hideButton" + index

  async function clickLikeButton(blog) {
    await likeButton(blog, user)
      .then(() => {
        setMessage("liked " + blog.title)
        setNotification(true)
        updateAtualBlogs()
      })

      .catch((error) => console.log(error))
  }

  async function clickButtonDelete() {
    if (window.confirm("are you sure you want to delete this blog?")) {
      await deleteBlog(blog, user)
        .then(() => {
          setRed(true)
          setMessage("deleted " + blog.title)
          setNotification(true)
          updateAtualBlogs()
        })

        .catch((error) => console.log(error))
    } else {
      setMessage("deletion canceled")
      setNotification(true)
      setRed(true)
    }
  }

  function returnDeleteButton() {
    return (
      <div>
        <button id={idButtonDelete} onClick={() => clickButtonDelete()}>delete</button>
      </div>
    )
  }


  if (blogVisible === false) {
    return (
      <div
        style={{
          border: "3px solid black",
          borderRadius: "5px",
          padding: "5px",
          margin: "5px",
        }} id="blogDiv"
      >
        {blog.title} {blog.author}{" "}
        <button
          id={blogVisible ? idButtonHide : idButtonView}
          onClick={() => {
            setBlogVisible(true)
          }}
        >
          {blogVisible ? "hide" : "view"}
        </button>
      </div>
    )
  } else {
    return (
      <div
        style={{
          border: "3px solid black",
          borderRadius: "5px",
          padding: "5px",
          margin: "5px",
        }}
      >
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
      </div>
    )
  }
}
