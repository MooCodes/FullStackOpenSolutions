const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});
  console.log("cleared");

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);

  console.log("done");
});

describe("get tests", () => {
  test("notes are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("there are six blogs", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(6);
  });

  test("verify id property is defined", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const firstBlog = blogsAtStart[0];

    expect(firstBlog.id).toBeDefined();
  });
});

describe("post tests", () => {
  test("add a new blog", async () => {
    const newBlog = {
      title: "new blog test",
      author: "Ali Baig",
      url: "someRandomURL.com",
      likes: 5,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map((blog) => blog.title);
    expect(titles).toContain("new blog test");
  });

  test("likes property missing defaults to 0", async () => {
    const newBlog = {
      title: "new blog test",
      author: "Ali Baig",
      url: "someRandomURL.com",
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    const missingLikesBlog = blogsAtEnd.find(
      (blog) => blog.title === "new blog test"
    );

    expect(missingLikesBlog.likes).toBe(0);
  });

  test("title or url properties missing", async () => {
    const newBlog = {
      author: "Ali Baig",
      likes: 15,
    };

    await api.post("/api/blogs").send(newBlog).expect(400);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
});

describe("delete tests", () => {
  test("delete a blog", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    console.log(blogToDelete);

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const title = blogsAtEnd.map((blog) => blog.title);

    expect(title).not.toContain(blogToDelete.title);
  });
});

describe("put tests", () => {
  test("update a blog", async () => {
    const blogsAtStart = await helper.blogsInDb();
    let blogToUpdate = blogsAtStart.find(
      (blog) => blog.title === "React patterns"
    );

    //console.log("before", blogToUpdate);

    const bookEdit = {
      title: blogToUpdate.title,
      author: blogToUpdate.author,
      url: blogToUpdate.url,
      likes: blogToUpdate.likes + 1,
    };

    // console.log(blogToUpdate.id);

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(bookEdit)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();

    //console.log("after", blogsAtEnd);
    blogToUpdate = blogsAtEnd.find((blog) => blog.title === "React patterns");

    expect(blogToUpdate.likes).toBe(8);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
