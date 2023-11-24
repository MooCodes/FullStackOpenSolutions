const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (blogs.length === 0) return 0;

  return blogs.reduce((acc, curr) => curr.likes + acc, 0);
};

const favoriteBlog = (blogs) => {
  const highestLikedBlog = blogs.reduce((prev, curr) => {
    if (prev.likes > curr.likes)
      return {
        title: prev.title,
        author: prev.author,
        likes: prev.likes,
      };
    return {
      title: curr.title,
      author: curr.author,
      likes: curr.likes,
    };
  });

  return highestLikedBlog;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
