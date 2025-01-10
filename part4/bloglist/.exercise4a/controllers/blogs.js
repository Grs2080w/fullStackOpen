const blogRouter = require('express').Router()
const Blog = require('../models/blog')


blogRouter.get('/api/blogs', (request, response) => {
  Blog.find({}).then(notes => {
    response.json(notes)
  })
})

blogRouter.get('/api/blogs/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

blogRouter.post('/api/blogs', (request, response, next) => {
  const body = request.body

  const blog = new Blog(request.body);

  blog.save()
    .then(savedNote => {
      response.json(savedNote)
    })
    .catch(error => next(error))
})

blogRouter.delete('/api/blogs/:id', (request, response, next) => {
  Blog.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

blogRouter.put('/api/blogs/:id', (request, response, next) => {
  const body = request.body

  const blog = new Blog(request.body);

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

blogRouter.get('*', (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' }).end()
})

module.exports = blogRouter