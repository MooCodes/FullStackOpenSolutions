import { useLazyQuery, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { ALL_BOOKS_BY_GENRE, CURRENT_USER } from "../queries";

const Recommend = ({ show }) => {
  const userResult = useQuery(CURRENT_USER);
  const [getBooks, { called, loading, data }] = useLazyQuery(
    ALL_BOOKS_BY_GENRE,
    {
      variables: { genre: "" },
    }
  );

  useEffect(() => {
    if (userResult.data) {
      console.log("have data");
      getBooks({ variables: { genre: userResult.data.me.favoriteGenre } });
    } else {
      getBooks();
    }
  }, [userResult]);

  if (userResult.loading || loading) {
    return <div>loading...</div>;
  }

  const books = data.allBooks;
  console.log(books);

  // const booksToShow = books.filter((b) =>
  //   b.genres.includes(user.favoriteGenre)
  // );

  if (!show) return null;

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <strong>{userResult.data.me.favoriteGenre}</strong>
      </p>
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
    </div>
  );
};

export default Recommend;
