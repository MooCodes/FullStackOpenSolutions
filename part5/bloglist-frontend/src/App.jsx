import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const fetchBlogs = async () => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    console.log(loggedUserJSON);
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
      const blogsFromAPI = await blogService.getAll();
      const filteredBlogs = blogsFromAPI.filter(
        (blog) => blog.user.username === user.username
      );
      console.log(filteredBlogs);
      setBlogs(filteredBlogs);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("logging in with", username, password);

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);

      const blogsFromAPI = await blogService.getAll();
      const filteredBlogs = blogsFromAPI.filter(
        (blog) => blog.user.username === user.username
      );
      console.log(filteredBlogs);
      setBlogs(filteredBlogs);

      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log("error logging in with", username, password);
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      window.localStorage.removeItem("loggedBlogappUser");
      setUser(null);
    }
  };

  const handleAddBlog = async (e) => {
    e.preventDefault();
    const blogToAdd = {
      title: title,
      author: author,
      url: url,
    };

    const response = await blogService.create(blogToAdd);
    //const seperateBlog = blogs.concat(response)
    setBlogs(blogs.concat(response));
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  if (user === null) {
    return (
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    );
  }

  // const filteredBlogs = blogs.filter(
  //   (blog) => blog.user.username === user.username
  // );

  return (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <h2>create new</h2>
      <form onSubmit={handleAddBlog}>
        title:
        <input
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
        />
        <br></br>
        author:
        <input
          type="text"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
        <br></br>
        url:
        <input
          type="text"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        />
        <br></br>
        <button type="submit">create</button>
      </form>
      {/* {blogs.filter(blog => blog.user.username === user.username).map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))} */}
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
