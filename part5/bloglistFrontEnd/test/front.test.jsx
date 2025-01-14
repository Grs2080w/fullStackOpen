import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import userEvent from "@testing-library/user-event"

import App from "../src/App"
import Blog from "../src/components/Blog"
import CreateNewBlog from "../src/components/CreateNewBlog"
import  login  from "../src/services/login"

import axios from "axios"

function returnedToken() {
  let token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImdhYmwxMjMiLCJpZCI6IjY3ODQ5OTU2MGE3M2Y4ZTlhZDYxZTAyZSIsImlhdCI6MTczNjc0MzMwMn0.6hHkJh1vqR_yUVydXdAhqlyjg0o8dWuOh0_tvq5Xe-8"

  let user = JSON.stringify({ token, name: "Gabriel", username: "gabl123" })

  return user
}

test("Login", async () => {
  let response = await login.login({ username: "gabl123", password: "senha" })
  localStorage.setItem("loggedBlogappUser", JSON.stringify(response))

  render(<App />)

  let textBlog = screen.getByText(/Blogs/i)
  expect(textBlog).toBeDefined()
})

test("renders content", () => {
  localStorage.clear()
  render(<App />)

  const element = screen.getByText(/log in to application/i)
  const username = screen.getByText(/username/i)
  const password = screen.getByText(/password/i)
  const login = screen.getByText(/login/i)

  expect(element).toBeDefined()
  expect(username).toBeDefined()
  expect(password).toBeDefined()
  expect(login).toBeDefined()
})

test("Logged if sucess", async () => {
  let user = returnedToken()

  localStorage.setItem("loggedBlogappUser", user)

  render(<App />)

  let textBlog = screen.getByText(/Blogs/i)
  expect(textBlog).toBeDefined()
})

test("render blog component", async () => {
  let user = returnedToken()
  user = JSON.parse(user)
  let tokenModified = "Bearer " + user.token
  let baseUrl = "http://localhost:3003/api/blogs"

  const request = await axios.get(baseUrl, {
    headers: { Authorization: tokenModified },
  })

  let blogs = request.data

  expect(blogs).toBeDefined()

  const MockFunction = jest.fn()

  blogs.map((blog) =>
    render(
      <Blog
        key={blog.id}
        blog={blog}
        setMessage={MockFunction}
        setNotification={MockFunction}
        user={user}
        updateAtualBlogs={MockFunction}
        setRed={MockFunction}
      />
    )
  )

  expect(screen.getAllByText(/GabBlog Gabriel Santos/)).toBeDefined()
})

test("Dont render the URL and the likes", async () => {
  let user = returnedToken()
  user = JSON.parse(user)
  let tokenModified = "Bearer " + user.token

  const request = await axios.get("http://localhost:3003/api/blogs", {
    headers: { Authorization: tokenModified },
  })
  let blogs = request.data

  expect(blogs).toBeDefined()

  const MockFunction = jest.fn()

  blogs.map((blog) =>
    render(
      <Blog
        key={blog.id}
        blog={blog}
        setMessage={MockFunction}
        setNotification={MockFunction}
        user={user}
        updateAtualBlogs={MockFunction}
        setRed={MockFunction}
      />
    )
  )

  let title = screen.getByText(/testTitle/)
  let author = screen.getByText(/testAuthor/)
  expect(title).toBeDefined()
  expect(author).toBeDefined()

  let url = screen.queryByText(/url/)
  let likes = screen.queryByText(/likes/)
  expect(url).toBeNull()
  expect(likes).toBeNull()
})

test("Render the URL and the likes", async () => {
  let user = returnedToken()
  user = JSON.parse(user)
  let tokenModified = "Bearer " + user.token

  const request = await axios.get("http://localhost:3003/api/blogs", {
    headers: { Authorization: tokenModified },
  })
  let blogs = request.data

  expect(blogs).toBeDefined()

  const MockFunction = jest.fn()

  blogs.map((blog) =>
    render(
      <Blog
        key={blog.id}
        blog={blog}
        setMessage={MockFunction}
        setNotification={MockFunction}
        user={user}
        updateAtualBlogs={MockFunction}
        setRed={MockFunction}
      />
    )
  )

  let viewButton = screen.getAllByText(/view/i)
  expect(viewButton).toBeDefined()

  await userEvent.click(viewButton[2])

  let url = screen.getByText(/url/)
  let likes = screen.getByText(/likes/)
  expect(url).toBeDefined()
  expect(likes).toBeDefined()
})

test("Double click on button like", async () => {
  let user = returnedToken()
  user = JSON.parse(user)
  let tokenModified = "Bearer " + user.token

  const request = await axios.get("http://localhost:3003/api/blogs", {
    headers: { Authorization: tokenModified },
  })
  let blogs = request.data

  expect(blogs).toBeDefined()

  const MockFunction = jest.fn()

  blogs.map((blog) =>
    render(
      <Blog
        key={blog.id}
        blog={blog}
        setMessage={MockFunction}
        setNotification={MockFunction}
        user={user}
        updateAtualBlogs={MockFunction}
        setRed={MockFunction}
        btnLike={MockFunction}
      />
    )
  )

  let viewButton = screen.getAllByText(/view/i)
  expect(viewButton).toBeDefined()

  await userEvent.click(viewButton[2])

  let buttonLike = screen.getByRole("button", { name: /like/i })

  await userEvent.click(buttonLike)
  await userEvent.click(buttonLike)

  expect(MockFunction).toHaveBeenCalledTimes(2)
})

test("Create new blog", async () => {
  let user = returnedToken()
  user = JSON.parse(user)

  let MockFunction = jest.fn()

  let { container } = render(
    <CreateNewBlog
      user={user}
      setMessage={MockFunction}
      setNotification={MockFunction}
      setToggleCreateBlog={MockFunction}
      updateAtualBlogs={MockFunction}
      mock={MockFunction}
    />
  )

  expect(screen.getByText(/Create new/i)).toBeDefined()

  let title = container.querySelector("#title")
  let author = container.querySelector("#author")
  let url = container.querySelector("#url")

  userEvent.type(title, "testTitle")
  userEvent.type(author, "testAuthor")
  userEvent.type(url, "testUrl")

  let button = screen.getByRole("button", { name: /create/i })

  await userEvent.click(button)

  expect(MockFunction).toHaveBeenCalledTimes(4)
})
