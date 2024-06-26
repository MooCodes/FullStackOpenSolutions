import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommend from "./components/Recommend";
import { useApolloClient, useSubscription } from "@apollo/client";
import { BOOK_ADDED, ALL_BOOKS_BY_GENRE, ALL_BOOKS } from "./queries";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const [favoriteGenre, setFavoriteGenre] = useState("");
  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const bookAdded = data.data.bookAdded;
      console.log("book added", bookAdded);

      const allBooks = client.readQuery({
        query: ALL_BOOKS_BY_GENRE,
        variables: { genre: "" },
      });
      console.log("allBooks: ",allBooks);
      client.writeQuery({
        query: ALL_BOOKS_BY_GENRE,
        variables: { genre: "" },
        data: { allBooks: allBooks.allBooks.concat(bookAdded) },
      });
    },
  });

  const logout = () => {
    setPage("authors");
    localStorage.clear();
    client.resetStore();
    setToken(null);
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <div>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommend")}>recommended</button>
            <button onClick={logout}>logout</button>
          </div>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <LoginForm
        setPage={setPage}
        show={page === "login"}
        setToken={setToken}
        setFavoriteGenre={setFavoriteGenre}
      />

      <Recommend show={page === "recommend"} favoriteGenre={favoriteGenre} />
    </div>
  );
};

export default App;
