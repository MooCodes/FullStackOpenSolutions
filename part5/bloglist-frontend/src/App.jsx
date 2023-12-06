import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import loginService from "./services/login";
import "./App.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [msg, setMsg] = useState("");
  const [showBlogForm, setShowBlogForm] = useState(false);

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

      const newState = {
        msg: "wrong username or password",
        style: "error",
      };

      setMsg(newState);

      setTimeout(() => {
        setMsg(null);
      }, 3000);
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

  const addBlog = async (blogObject) => {
    const newState = {
      msg: `a new blog ${blogObject.title} by ${blogObject.author}`,
      style: "success",
    };

    const response = await blogService.create(blogObject);
    console.log("response", response);
    const updatedBlogs = await blogService.getAll();
    //const seperateBlog = blogs.concat(response)
    setBlogs(updatedBlogs);

    setShowBlogForm(false);

    setMsg(newState);

    setTimeout(() => {
      setMsg(null);
    }, 3000);
  };

  if (user === null) {
    if (msg !== null) {
      return (
        <form onSubmit={handleLogin}>
          <div className={msg.style}>{msg.msg}</div>
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
    } else {
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
  }

  return (
    <div>
      <h2>blogs</h2>
      {msg !== null && <div className={msg.style}>{msg.msg}</div>}
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <h2>create new</h2>
      {!showBlogForm && 
        <div>
          <button onClick={() => setShowBlogForm(true)} >new blog</button>
        </div>
      }
      {showBlogForm && <BlogForm
        createBlog={addBlog}
        setShowBlogForm={setShowBlogForm}
        />
      }
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
