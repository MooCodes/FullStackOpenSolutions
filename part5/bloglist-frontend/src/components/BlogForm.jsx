const BlogForm = ({
  handleSubmit,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  title,
  author,
  url,
  setShowBlogForm,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      title:
      <input
        type="text"
        value={title}
        name="title"
        onChange={handleTitleChange}
      />
      <br></br>
      author:
      <input
        type="text"
        value={author}
        name="author"
        onChange={handleAuthorChange}
      />
      <br></br>
      url:
      <input type="text" value={url} name="url" onChange={handleUrlChange} />
      <br></br>
      <button type="submit">create</button>
      <br></br>
      <button type="button" onClick={() => setShowBlogForm(false)}>cancel</button>
    </form>
  );
};

export default BlogForm;
