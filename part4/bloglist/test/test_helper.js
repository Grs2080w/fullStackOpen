const Blog = require("../models/blog");

const inicialBlogs = [
  {
    title: "RaykaBlog",
    author: "Rayka Martilha",
    url: "https://youtube.com",
    likes: 20,
    user: {
      username: "Rayka123",
      name: "Rayka Martilha",
      id: "5f9b9d2a6f9c0d5e5b9c2a6f",
    }
  },
  {
    title: "GabBlog",
    author: "Gabriel Santos",
    url: "https://youtube.com",
    likes: 50,
    user: {
      username: "Gabriel123",
      name: "Gabriel Santos",
      id: "5f9b9d2a6f9c0d5e5b9c2a6f",
    }
  },
];

const nonExistingId = async () => {
  const blog = new Blog({ title: "willremovethissoon" });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const notesInDb = async () => {
  const blogs = await Blog.find({});
  return JSON.parse(JSON.stringify(blogs));
};

module.exports = {
  inicialBlogs,
  nonExistingId,
  notesInDb,
};
