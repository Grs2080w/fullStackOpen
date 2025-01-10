const for_testing = require("../utils/for_testing");

describe("list helper", () => {
  test("dummy returns one", () => {
    const blogs = [];

    const result = for_testing.dummy(blogs);
    expect(result).toBe(1);
  });

  test("total likes return 0", () => {
    const blogs = [];

    const result = for_testing.totalLikes(blogs);
    expect(result).toBe(0);
  });
});

describe("favoriteBlog ", () => {
  test("More likes is 10", () => {
    const blogs = [
      {
        likes: 10,
      },
      {
        likes: 10,
      },
    ];

    const result = for_testing.moreLikes(blogs);
    expect(result).toEqual(blogs[0]);
  });
});


describe("mostBlogs ", () => {
  test("Most blogs is 3", () => {
    const blogs = [
        {
            author: "Michael Chan",
            blogs: 3
        },
        {
            author: "Edsger W. Dijkstra",
            blogs: 2
        },
    ]

    const result = for_testing.mostBlogs(blogs);
    expect(result).toEqual(blogs[0]);
  });
});
