import { useLazyQuery, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { ALL_BOOKS_BY_GENRE, CURRENT_USER } from "../queries";

const Recommend = ({ show, favoriteGenre }) => {
  console.log(favoriteGenre);

  const { loading, error, data } = useQuery(ALL_BOOKS_BY_GENRE, {
    variables: { genre: favoriteGenre },
  });

  if (!show) return null;

  if (loading) return <div>loading...</div>;
  if (error) return <div>{error.message}</div>;

  const books = data.allBooks;

  // const booksToShow = books.filter((b) =>
  //   b.genres.includes(user.favoriteGenre)
  // );

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre {favoriteGenre}</p>
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
