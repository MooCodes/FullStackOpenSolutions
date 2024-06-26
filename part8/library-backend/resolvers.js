const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");

const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: () => authors.length,
    allBooks: async (root, args) => {
      if (args.author) {
        const author = await Author.findOne({ name: args.author });

        if (author) {
          if (args.genre) {
            return Book.find({
              author: author._id,
              genres: { $in: [args.genre] },
            }).populate("author");
          }
          return Book.find({ author: author._id }).populate("author");
        }
        return null;
      }

      if (args.genre) {
        return Book.find({ genres: { $in: [args.genre] } }).populate("author");
      }

      return Book.find({}).populate("author");
    },
    allAuthors: async () => {
      return Author.find({});
    },
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Author: {
    bookCount: async (root) => {
      const author = await Author.findOne({ name: root.name });
      const authorBooks = await Book.find({ author: author._id });
      return authorBooks.length;
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      // check if authorized
      const currentUser = context.currentUser;

      if (!currentUser) {
        console.log("no user");
        throw new GraphQLError("Unauthenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
          },
        });
      }

      console.log("user is authorized");

      // check if there's an author that exists
      const author = await Author.findOne({ name: args.author });

      let book;

      book = new Book({
        title: args.title,
        published: args.published,
        genres: args.genres,
      });

      // if there's no author, create one
      if (!author) {
        const newAuthor = new Author({ name: args.author });
        await newAuthor.save();
        book.author = newAuthor;
      } else {
        book.author = author;
      }

      try {
        await book.save();
      } catch (error) {
        throw new GraphQLError("Saving the book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title,
            error,
          },
        });
      }

      pubsub.publish("BOOK_ADDED", { bookAdded: book });

      return book;
    },
    editAuthor: async (root, args, context) => {
      // check if authorized
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError("Unauthenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
          },
        });
      }

      const author = await Author.findOne({ name: args.name });

      if (!author) {
        return null;
      }

      author.born = args.setBornTo;
      await author.save();
      return author;
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });
      return user.save().catch((error) => {
        throw new GraphQLError("Creating the user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
          },
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== "secret") {
        throw new GraphQLError("Wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers;
