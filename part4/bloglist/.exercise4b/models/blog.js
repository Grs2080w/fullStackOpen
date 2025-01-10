const mongoose = require("mongoose");
const config = require('../utils/config')

const mongoUrl = config.MONGODB_URI;
//mongoose.connect(mongoUrl);

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog