const Blog = require("../models/blog");

const inicialBlogs = [
  {
    title: "RaykaBlog",
    author: "Rayka Martilha",
    url: "https://youtube.com",
    likes: 20,
  },
  {
    title: "GabBlog",
    author: "Gabriel Santos",
    url: "https://youtube.com",
    likes: 50,
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
