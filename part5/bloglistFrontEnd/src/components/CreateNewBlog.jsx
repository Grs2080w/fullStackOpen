import { createNewBlog } from "../services/blogs"
import { useState } from "react"

import PropTypes from "prop-types"

export default function CreateNewBlog({
  user,
  setMessage,
  setNotification,
  setToggleCreateBlog,
  updateAtualBlogs,
}) {

  CreateNewBlog.propTypes = {
    user: PropTypes.object.isRequired,
    setMessage: PropTypes.func,
    setNotification: PropTypes.func,
    setToggleCreateBlog: PropTypes.func,
    updateAtualBlogs: PropTypes.func
  }

  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  function clickCreateBlog(title, author, url, user) {
    createNewBlog(title, author, url, user)
      .then(() => {
        updateAtualBlogs()
        setMessage(`a new blog ${title} by ${author} added`)
        setNotification(true)
        setToggleCreateBlog(false)
      })
      .catch((error) => console.log(error))
  }

  return (
    <div>
      <h1>Create New</h1>

      <div>
        title:{" "}
        <input
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          type="text"
          name=""
          id="title"
        />
        <br />
        author:{" "}
        <input
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          type="text"
          name=""
          id="author"
        />
        <br />
        url:
        <input
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          type="text"
          name=""
          id="url"
        />
        <br />
        <br />
        <button id="create-buttonInsideForm" onClick={() => clickCreateBlog(title, author, url, user)}>
          create
        </button>
        <br />
        <button onClick={() => setToggleCreateBlog(false)}>cancel</button>
        <br />
      </div>
    </div>
  )
}
