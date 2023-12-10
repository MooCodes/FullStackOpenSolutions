import { useState } from "react";

const Blog = ({ blog, updateBlog, removeBlog }) => {
  const [showMore, setShowMore] = useState(false);

  const buttonText = !showMore ? "view" : "hide";

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
    };

    updateBlog(blog.id, newBlog);
  };

  const blogDetails = () => {
    return (
      <div>
        {blog.url}
        <br></br>
        {blog.likes} <button onClick={handleLikeClick}>like</button>
        <br></br>
        {blog.user.name}
        <br></br>
        <button onClick={() => removeBlog(blog.id)} >remove</button>
      </div>
    );
  };

  return (
    <div className="blog" style={blogStyle}>
      {blog.title} {blog.author}{" "}
      <button onClick={() => setShowMore(!showMore)}>{buttonText}</button>
      {showMore && blogDetails()}
    </div>
  );
};

export default Blog;
