import { useState } from "react";
import PropTypes from "prop-types";

const BlogForm = ({ createBlog, setShowBlogForm }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    createBlog({
      title: title,
      author: author,
      url: url,
    });

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <form onSubmit={handleSubmit}>
      title:
      <input
        type="text"
        value={title}
        name="title"
        onChange={(e) => setTitle(e.target.value)}
        placeholder="write title here"
        title="blogTitle"
      />
      <br></br>
      author:
      <input
        type="text"
        value={author}
        name="author"
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="write author here"
        id="blogAuthor"
      />
      <br></br>
      url:
      <input
        type="text"
        value={url}
        name="url"
        onChange={(e) => setUrl(e.target.value)}
        placeholder="write url here"
        id="blogUrl"
      />
      <br></br>
      <button type="submit">create</button>
      <br></br>
      <button
        id="submitBlog"
        type="button"
        onClick={() => setShowBlogForm(false)}
      >
        cancel
      </button>
    </form>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
  setShowBlogForm: PropTypes.func.isRequired,
};

export default BlogForm;
