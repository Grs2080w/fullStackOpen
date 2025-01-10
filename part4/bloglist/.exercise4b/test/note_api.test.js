const supertest = require("supertest");
const mongoose = require("mongoose");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});

  let blogObjects = helper.inicialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});



describe("Length", () => {
    
    test("Length of blogs is 2", async () => { // 4.8
      const blogs = await api.get("/api/blogs");
      expect(blogs.body.length).toBe(2);
    });

})

describe("if id", () => {

    test("have id", async () => { // 4.9
      const blogs = await api.get("/api/blogs");
      expect(blogs.body[0]._id).toBeDefined();
    });

})

describe('If post', () => {

    test('saved a blog and more 1 in the database', async () => { //4.10 and 4.11
    
        let newBlog = {
            title: "fullBlog",
            author: "helsinki",
            url: "https://youtube.com",
            likes: null ?? 0 // 5000
        }
        
    
        await api.post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(3)
        
        let blogsAfter = response.body.filter(x => x.title === newBlog.title)
        expect(blogsAfter).toBeDefined()
    
        await api.delete(`/api/blogs/${blogsAfter[0]._id}`)
    
    })

})

describe("without some data", () => {
    
    test('required title or URL', async () => { //4.12
    
        let newBlog = {
            author: "helsinki",
            url: "https://youtube.com",
            likes: 0 // 5000
        }
    
        await api.post('/api/blogs')
        .send(newBlog)
        .expect(400)
    
    })
    
})

describe('if delete', () => { // 4.13

    test("a blog can be deleted", async () => {
      const blogsAtStart = await helper.notesInDb();
      const blogToDelete = blogsAtStart[0];
    
      await api.delete(`/api/blogs/${blogToDelete._id}`).expect(204);
    
      const blogsAtEnd = await helper.notesInDb();
    
      expect(blogsAtEnd).toHaveLength(helper.inicialBlogs.length - 1);
    
      const titles = blogsAtEnd.map((r) => r.title);
    
      expect(titles).not.toContain(blogToDelete.title);

    })

});

describe("if alt", () => {

    test("has alt", async () => { // 4.14

      const blogs = await api.get("/api/blogs");
      let person = blogs.body[0]

      let newPerson = {
        title: "testTitle",
        author: "testAuthor",
        url: "https://test.com",
        likes: null ?? 0
      }

      await api.put(`/api/blogs/${person._id}`)
      .send(newPerson)
      .expect(200)
      .expect('Content-Type', /application\/json/)
      
      const response = await api.get('/api/blogs')
      let personAfterAlt = response.body.filter(x => {
        if (x._id === person._id) {
            return x
        }
      })

      expect(personAfterAlt[0].title).toBe(newPerson.title)


    });

})



afterAll(async () => {
  await mongoose.connection.close();
});
