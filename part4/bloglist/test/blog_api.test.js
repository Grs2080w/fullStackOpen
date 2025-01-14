const supertest = require("supertest");
const mongoose = require("mongoose");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const Blog = require("../models/blog");
const User = require("../models/user");

beforeEach(async () => {
  await Blog.deleteMany({});

  let blogObjects = helper.inicialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
}, 8000);

async function getToken() {
  let password = Math.random().toString(36).substring(2);
  let numberAleatory = Math.floor(Math.random() * 1000);
  let passwordHash = await bcrypt.hash(password, 10);

  let userDefault = new User({
    username: "Gabriel" + numberAleatory,
    name: "Gabriel Santos",
    passwordHash,
  });

  userDefault = await userDefault.save();

  let response = await api
    .post("/api/login")
    .send({ username: "Gabriel" + numberAleatory, password });

  let token = response.body.token;
  token = "Bearer " + token;

  return token;
}

describe("Length", () => {
  test("Length of blogs is 2", async () => {
    // 4.8
    let token = await getToken();
    const blogs = await api.get("/api/blogs").set("Authorization", token);
    expect(blogs.body.length).toBe(2);
  }, 8000);
});

describe("if id", () => {
  test("have id", async () => {
    // 4.9
    let token = await getToken();
    const blogs = await api.get("/api/blogs").set("Authorization", token);
    expect(blogs.body[0].id).toBeDefined();
  });
});

describe("If post", () => {
  test("saved a blog and more 1 in the database", async () => {
    //4.10 and 4.11

    let newBlog = {
      title: "fullBlog",
      author: "helsinki",
      url: "https://youtube.com",
      likes: null ?? 0,
    };

    let token = await getToken();

    await api
      .post("/api/blogs")
      .set("Authorization", token)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs").set("Authorization", token);
    expect(response.body.length).toBe(3);

    let blogsAfter = response.body.filter((x) => x.title === newBlog.title);
    expect(blogsAfter).toBeDefined();

    await api
      .delete(`/api/blogs/${blogsAfter[0]._id}`)
      .set("Authorization", token);
  });
});

describe("without some data", () => {
  test("required title or URL", async () => {
    //4.12

    let newBlog = {
      author: "helsinki",
      url: "https://youtube.com",
      likes: 0, // 5000
    };

    let token = await getToken();
    await api
      .post("/api/blogs")
      .set("Authorization", token)
      .send(newBlog)
      .expect(400);
  });
});

describe("if delete", () => {
  // 4.13

  test("a blog can be deleted", async () => {
    let token = await getToken();

    let body = {
      title: "testTitle",
      author: "fulan",
      url: "https://youtube.com",
      likes: 2,
    };

    let response = await api
      .post("/api/blogs")
      .set("Authorization", token)
      .send(body)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    let titleBlog = response.body.title;
    let idBlog = response.body.id;

    let blogsAfterPost = await api
      .get("/api/blogs")
      .set("Authorization", token)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    await api
      .delete(`/api/blogs/${idBlog}`)
      .set("Authorization", token)
      .expect(204);

    const blogsAtEnd = await api
      .get("/api/blogs")
      .set("Authorization", token)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(blogsAtEnd.body.length).toBe(blogsAfterPost.body.length - 1);

    const titles = blogsAtEnd.body.map((r) => r.title);
    expect(titles).not.toContain(titleBlog);
  });
});

describe("if alt", () => {
  test("has alt", async () => {
    // 4.14

    let token = await getToken();

    let blogs = await api.get("/api/blogs").set("Authorization", token);
    let person = blogs.body[0];

    let newPerson = {
      title: "testTitle",
      author: "testAuthor",
      url: "https://test.com",
      likes: null ?? 0,
    };

    await api
      .put(`/api/blogs/${person.id}`)
      .set("Authorization", token)
      .send(newPerson)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs").set("Authorization", token);
    let personAfterAlt = response.body.filter((x) => {
      if (x._id === person._id) {
        return x;
      }
    });

    expect(personAfterAlt[0].title).toBe(newPerson.title);


  });
});

describe("set defaults", () => {
  test("set blogs defaults", async () => {
    await Blog.deleteMany({});

    let token = await getToken();

    let blogsDefault = [
      {
        title: "RaykaBlog",
        author: "Rayka Martilha",
        url: "https://youtube.com",
        likes: 20,
        user: {
          username: "Rayka123",
          name: "Rayka Martilha",
          id: "5f9b9d2a6f9c0d5e5b9c2a6f",
        },
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
        },
      },
    ];

    await api.post("/api/blogs")
      .set("Authorization", token)
      .send(blogsDefault[0])
      .expect(201)
      .expect("Content-Type", /application\/json/);

    await api.post("/api/blogs")
      .set("Authorization", token)
      .send(blogsDefault[1])
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs").set("Authorization", token);

    expect(response.body.length).toBe(2);
    expect(response.body[0].likes).toBe(20);
    expect(response.body[1].likes).toBe(50);

  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
