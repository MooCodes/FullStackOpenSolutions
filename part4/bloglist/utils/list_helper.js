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

const mostBlogs = (blogs) => {
  const mostBlogsHashMap = {};

  let mostBlogsAuthor = {
    author: "",
    blogs: -1,
  };

  for (let i = 0; i < blogs.length; i++) {
    // increment the # of blogs for this author
    if (!mostBlogsHashMap[blogs[i].author])
      mostBlogsHashMap[blogs[i].author] = 1;
    else mostBlogsHashMap[blogs[i].author] += 1;

    if (mostBlogsHashMap[blogs[i].author] > mostBlogsAuthor.blogs)
      mostBlogsAuthor = {
        author: blogs[i].author,
        blogs: mostBlogsHashMap[blogs[i].author],
      };
  }
  return mostBlogsAuthor;
};

const mostLikes = (blogs) => {
  const mostLikesHashMap = {};

  let mostLikedAuthor = {
    author: "",
    likes: -1,
  };

  for (let i = 0; i < blogs.length; i++) {
    if (!mostLikesHashMap[blogs[i].author])
      mostLikesHashMap[blogs[i].author] = blogs[i].likes;
    else mostLikesHashMap[blogs[i].author] += blogs[i].likes;

    if (mostLikesHashMap[blogs[i].author] > mostLikedAuthor.likes)
      mostLikedAuthor = {
        author: blogs[i].author,
        likes: mostLikesHashMap[blogs[i].author],
      };
  }

  return mostLikedAuthor;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
