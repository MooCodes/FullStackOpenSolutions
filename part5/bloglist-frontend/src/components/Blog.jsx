import { useState } from "react";

const Blog = ({ blog, updateBlog, removeBlog }) => {
  const [showMore, setShowMore] = useState(false);

  const buttonText = !showMore ? "view" : "hide";

  const showRemoveButton =
    blog.user.username ==
    JSON.parse(window.localStorage.getItem("loggedBlogappUser")).username
      ? true
      : false;

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleLikeClick = () => {
    const newBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user
    };

    console.log(newBlog);

    updateBlog(blog.id, newBlog);
  };

  const removeButton = () => {
    return (
      <div>
        <button id="removeButton" onClick={() => removeBlog(blog.id)}>
          remove
        </button>
      </div>
    );
  };

  const blogDetails = () => {
    return (
      <div>
        {blog.url}
        <br></br>
        {blog.likes}{" "}
        <button id="likeButton" onClick={handleLikeClick}>
          like
        </button>
        <br></br>
        {blog.user.name}
        {showRemoveButton && removeButton()}
      </div>
    );
  };

  return (
    <div className="blog" style={blogStyle}>
      {blog.title} {blog.author}{" "}
      <button id="showDetails" onClick={() => setShowMore(!showMore)}>
        {buttonText}
      </button>
      {showMore && blogDetails()}
    </div>
  );
};

export default Blog;
