const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const app = require("../app");

const supertest = require("supertest");
const api = supertest(app);

const User = require("../models/user");

beforeEach(async () => {
  await User.deleteMany({});

  let passwordHash = await bcrypt.hash("rootPassword", 10);

  const user = new User({ username: "root1234", name: "rooter", passwordHash });
  await user.save();

  const user2 = {
    username: "Gabriel123",
    name: "Gabriel Santos",
    passwordHash,
  };

  let user2User = new User(user2);
  await user2User.save();
});

describe("if get", () => {
  //4.16

  test("get resquest status 200", async () => {
    const response = await api.get("/api/users");
    expect(response.status).toBe(200);
  });

  test("get request content length 2", async () => {
    const response = await api.get("/api/users");
    expect(response.body.length).toBe(2);
  });

  test("get request content type", async () => {
    const response = await api.get("/api/users");
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
  });

  test("get request content", async () => {
    const response = await api.get("/api/users");
    expect(response.body[0]).toEqual({
      username: "root1234",
      name: "rooter",
      id: expect.any(String),
      blogs: expect.any(Array),
    });
  });
});

describe("if post", () => {
  //4.16

  test("Status 400 if name with 2 letters", async () => {
    const user = {
      username: "us",
      name: "Johan",
      password: "password",
    };

    let response = await api.post("/api/users").send(user);
    expect(response.status).toBe(400);
  });

  test("Status 400 if password with 2 letters", async () => {
    const user = {
      username: "userJohan",
      name: "Johan",
      password: "pa",
    };

    let response = await api.post("/api/users").send(user);
    expect(response.status).toBe(400);
  });

  test("Status 201 if user created", async () => {
    const user = {
      username: "userJohan",
      name: "Johan",
      password: "passwordJohan",
    };

    let response = await api.post("/api/users").send(user);
    expect(response.status).toBe(201);
  });

  test("lenght of users is 2", async () => {
    const user = {
      username: "userJohan",
      name: "Johan",
      password: "passwordJohan",
    };

    const response = await api.post("/api/users").send(user);
    const users = await api.get("/api/users");
    expect(users.body.length).toBe(3);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
