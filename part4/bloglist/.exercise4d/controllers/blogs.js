const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogRouter.get("/api/blogs", async (request, response) => {
  let notes = await Blog.find({});
  response.json(notes);
});

blogRouter.get("/api/blogs/:id", async (request, response, next) => {
  let note = await Blog.findById(request.params.id);

  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

async function userToUpdate(blog, user) {
  let userToUpdate = await User.findById(user.id);
  userToUpdate = JSON.parse(JSON.stringify(userToUpdate));
  userToUpdate.blogs.push(blog);

  await User.findByIdAndUpdate(user.id, userToUpdate, { new: true });
}

blogRouter.post("/api/blogs", async (request, response, next) => {
  let blogBody = request.body;

  if (!request.user.id) {
    return response.status(401).json({ error: "token invalid" });
  }

  var user = await User.findById(request.user.id);
  user = JSON.parse(JSON.stringify(user));

  let newBlog = {
    ...blogBody,
    user,
  };

  let blog = new Blog(newBlog);
  let savedNote = await blog.save();

  let blogs = await Blog.find({});
  blogs = JSON.parse(JSON.stringify(blogs));

  blogs.forEach((blog) => {
    if (blog.title == blogBody.title) {
      const { title, author, url, id } = blog;

      const blogAfterId = {
        title,
        author,
        url,
        id,
      };

      if (!user) {
        response
          .status(404)
          .send({
            status: 404,
            error: "user not found, id must be provided",
          })
          .end();
      } else {
        userToUpdate(blogAfterId, user);
      }
    }
  });

  response.status(201).json(savedNote).end();
});

blogRouter.delete("/api/blogs/:id", async (request, response, next) => {
  let blog = await Blog.findById(request.params.id);
  blog = JSON.parse(JSON.stringify(blog));

  if (blog.user.id == request.user.id) {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).send({ message: "blog deleted" }).end();
  } else {
    response
      .status(401)
      .send({
        error: "unauthorized, just the creator of the blog can delete it",
      })
      .end();
  }
});

blogRouter.put("/api/blogs/:id", async (request, response, next) => {
  const blog = new Blog(request.body);
  blog._id = request.params.id;

  await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });

  let updatedBlog = request.body;
  response.status(200).json(updatedBlog).end();
});


blogRouter.get("*", (request, response) => {
  response.status(404).send({ error: "unknown endpoint" }).end();
});

module.exports = blogRouter;
