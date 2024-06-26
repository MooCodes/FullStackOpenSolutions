const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const middleware = require("../utils/middleware");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  response.json(blogs);
});

// const getTokenFrom = (request) => {
//   const authorization = request.get("authorization");
//   if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
//     return authorization.replace("bearer ", "");
//   }
//   return null;
// };

blogsRouter.post(
  "/",
  middleware.userExtractor,
  async (request, response, next) => {
    const body = request.body;
    const user = request.user;

    const newBlog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user.id,
      comments: body.comments,
    };

    const blog = new Blog(newBlog);

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.status(201).json(savedBlog);
  }
);

blogsRouter.post("/:id/comments", async (request, response) => {
  const body = request.body;
  console.log(body.comment);
  const blog = await Blog.findById(request.params.id);
  blog.comments = blog.comments.concat(body.comment);
  const updatedBlog = await blog.save();
  response.status(201).json(updatedBlog);
});

blogsRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    const user = request.user;

    const blog = await Blog.findById(request.params.id);

    if (blog.user.toString() === user.id.toString()) {
      await Blog.deleteOne({ _id: request.params.id });
      response.status(204).end();
    } else {
      response.status(400).json({ error: "blog doesn't belong to this user" });
    }
  }
);

blogsRouter.put("/:id", middleware.userExtractor, async (request, response) => {
  const body = request.body;
  // const user = request.user;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    comments: body.comments,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });

  response.json(updatedBlog);
});

module.exports = blogsRouter;
