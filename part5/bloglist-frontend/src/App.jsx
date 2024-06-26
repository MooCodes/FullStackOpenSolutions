import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import loginService from "./services/login";
import userService from "./services/users";
import { useSelector, useDispatch } from "react-redux";
import { setMsg, reset } from "./reducers/msgReducer";
import { setBlogs, appendBlog } from "./reducers/blogReducer";
import { setUser } from "./reducers/userReducer";
import { Link, Route, Routes, useParams } from "react-router-dom";
import "./App.css";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showBlogForm, setShowBlogForm] = useState(false);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    userService.getAll().then((users) => {
      setUsers(users);
    });
  }, []);

  const msg = useSelector((state) => state.msg);
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const fetchBlogs = async () => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    console.log(loggedUserJSON);
    if (loggedUserJSON) {
      const userObj = JSON.parse(loggedUserJSON);
      dispatch(setUser(userObj));
      blogService.setToken(userObj.token);
      const blogsFromAPI = await blogService.getAll();
      // const filteredBlogs = blogsFromAPI.filter(
      //   (blog) => blog.user.username === user.username
      // );
      // console.log(filteredBlogs);
      dispatch(setBlogs(blogsFromAPI));
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
      // const filteredBlogs = blogsFromAPI.filter(
      //   (blog) => blog.user.username === user.username
      // );
      // console.log(filteredBlogs);
      // setBlogs(filteredBlogs);
      setBlogs(blogsFromAPI);

      dispatch(setUser(user));
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log("error logging in with", username, password);

      const newState = {
        msg: "wrong username or password",
        style: "error",
      };

      dispatch(setMsg(newState));

      setTimeout(() => {
        dispatch(reset());
      }, 3000);
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      window.localStorage.removeItem("loggedBlogappUser");
      dispatch(setUser(null));
    }
  };

  const addBlog = async (blogObject) => {
    const newState = {
      msg: `a new blog ${blogObject.title} by ${blogObject.author}`,
      style: "success",
    };

    const response = await blogService.create(blogObject);
    console.log("response", response);

    const blogsFromAPI = await blogService.getAll();

    dispatch(setBlogs(blogsFromAPI));

    setShowBlogForm(false);

    dispatch(setMsg(newState));

    setTimeout(() => {
      dispatch(reset());
    }, 3000);
  };

  const updateBlog = async (id, blogObject) => {
    const response = await blogService.update(id, blogObject);

    const blogsFromAPI = await blogService.getAll();
    // const filteredBlogs = blogsFromAPI.filter(
    //   (blog) => blog.user.username === user.username
    // );
    // console.log(filteredBlogs);
    // setBlogs(filteredBlogs);
    dispatch(setBlogs(blogsFromAPI));
  };

  const addComment = async (id, comment) => {
    const response = await blogService.addComment(id, comment);
    const blogsFromAPI = await blogService.getAll();

    dispatch(setBlogs(blogsFromAPI));
  };

  const removeBlog = async (id) => {
    if (window.confirm("Are you sure you want to remove this blog?")) {
      const response = await blogService.remove(id);

      const blogsFromAPI = await blogService.getAll();
      // const filteredBlogs = blogsFromAPI.filter(
      //   (blog) => blog.user.username === user.username
      // );
      // console.log(filteredBlogs);
      // setBlogs(filteredBlogs);
      dispatch(setBlogs(blogsFromAPI));
    }
  };

  if (user === null) {
    if (msg !== null) {
      return (
        <form onSubmit={handleLogin}>
          <div className={msg.style}>{msg.msg}</div>
          <div>
            username
            <input
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="login-button" type="submit">
            login
          </button>
        </form>
      );
    } else {
      return (
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="login-button" type="submit">
            login
          </button>
        </form>
      );
    }
  }

  // user exists!

  const Navbar = () => {
    const liStyle = { display: "inline", marginRight: 10 };
    return (
      <nav style={{ backgroundColor: "grey" }}>
        <ul style={{ margin: 0, padding: 0 }}>
          <li style={liStyle}>
            <Link to="/">blogs</Link>
          </li>
          <li style={liStyle}>
            <Link to="/users">users</Link>
          </li>
          <li style={liStyle}>
            {user.name} logged in
            <button id="logout-button" onClick={handleLogout}>
              logout
            </button>
          </li>
        </ul>
      </nav>
    );
  };

  // 5.10
  const blogsToShow = [...blogs];
  blogsToShow.sort((a, b) => b.likes - a.likes);

  const BlogInfo = () => {
    const { id } = useParams();
    const blogToFind = blogs.find((blog) => blog.id === id);
    if (!blogToFind) return null;
    return (
      <Blog
        blog={blogToFind}
        updateBlog={updateBlog}
        removeBlog={removeBlog}
        addComment={addComment}
        showDetails={true}
      />
    );
  };

  const Menu = () => {
    return (
      <Routes>
        <Route path="/" element={<BlogList />}></Route>
        <Route path="/users" element={<UsersList />}></Route>
        <Route path="/users/:id" element={<UserInfo />}></Route>
        <Route path="/blogs/:id" element={<BlogInfo />}></Route>
      </Routes>
    );
  };

  const UserInfo = () => {
    const { id } = useParams();

    const userToFind = users.find((user) => user.id === id);
    if (!userToFind) return null;
    const userBlogs = blogs.filter((blog) => blog.user.id === id);

    return (
      <div>
        <h2>{userToFind.name}</h2>
        <h3>added blogs</h3>
        <ul>
          {userBlogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      </div>
    );
  };

  const UsersList = () => {
    return (
      <div>
        <h2>Users</h2>
        <table width={"25%"}>
          <tbody>
            <tr>
              <th></th>
              <th style={{ textAlign: "left" }}>blogs created</th>
            </tr>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const BlogList = () => {
    return (
      <>
        <h2>create new</h2>
        {!showBlogForm && (
          <div>
            <button onClick={() => setShowBlogForm(true)}>new blog</button>
          </div>
        )}
        {showBlogForm && (
          <BlogForm createBlog={addBlog} setShowBlogForm={setShowBlogForm} />
        )}
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={updateBlog}
            removeBlog={removeBlog}
          />
        ))}
      </>
    );
  };

  return (
    <div>
      <Navbar />
      <h2>blogs</h2>
      {msg !== null && <div className={msg.style}>{msg.msg}</div>}
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      {Menu()}
    </div>
  );
};

export default App;
