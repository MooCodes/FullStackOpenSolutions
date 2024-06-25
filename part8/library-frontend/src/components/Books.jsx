import { useState } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { ALL_BOOKS, ALL_BOOKS_BY_GENRE } from "../queries";
import { useEffect } from "react";

const Books = (props) => {
  const [genre, setGenre] = useState("");
  const [getBooks, { called, loading, data }] =
    useLazyQuery(ALL_BOOKS_BY_GENRE);

  useEffect(() => {
    console.log("executing since genre changed", genre);
    getBooks({
      variables: { genre },
    });
  }, [genre]);

  if (!props.show) {
    return null;
  }

  if (called && loading) {
    return <div>loading...</div>;
  }

  console.log(data);

  const books = data ? data.allBooks : [];

  // const books = genre
  //   ? data.allBooks.filter((book) => book.genres.includes(genre))
  //   : data.allBooks;

  // get all genres from all books
  const allGenres = data.allBooks.reduce((acc, book) => {
    book.genres.forEach((genre) => {
      if (!acc.includes(genre)) {
        acc.push(genre);
      }
    });
    return acc;
  }, []);

  console.log(allGenres);

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {allGenres.map((genre) => (
        <button key={genre} onClick={() => setGenre(genre)}>
          {genre}
        </button>
      ))}
      <button onClick={() => setGenre("")}>all genres</button>
    </div>
  );
};

export default Books;
