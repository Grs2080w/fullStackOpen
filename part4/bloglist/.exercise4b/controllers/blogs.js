const blogRouter = require('express').Router()
const Blog = require('../models/blog')


blogRouter.get('/api/blogs', async (request, response) => {
  let notes = await Blog.find({})
  response.json(notes)
})

blogRouter.get('/api/blogs/:id',async (request, response, next) => {
  let note = await Blog.findById(request.params.id)

  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }

})

blogRouter.post('/api/blogs', async (request, response, next) => {

  const blog = new Blog(request.body);
  let savedNote = await blog.save()
  response.status(201).json(savedNote).end()

})

blogRouter.delete('/api/blogs/:id',async (request, response, next) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()

})

blogRouter.put('/api/blogs/:id', async (request, response, next) => {

  const blog = new Blog(request.body);

  blog._id = request.params.id

  await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })

  let updatedBlog = request.body
  response.status(200).json(updatedBlog).end()
    
})

blogRouter.get('*', (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' }).end()
})

module.exports = blogRouter