import { useState } from "react";

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
      />
      <br></br>
      author:
      <input
        type="text"
        value={author}
        name="author"
        onChange={(e) => setAuthor(e.target.value)}
      />
      <br></br>
      url:
      <input
        type="text"
        value={url}
        name="url"
        onChange={(e) => setUrl(e.target.value)}
      />
      <br></br>
      <button type="submit">create</button>
      <br></br>
      <button type="button" onClick={() => setShowBlogForm(false)}>
        cancel
      </button>
    </form>
  );
};

export default BlogForm;
