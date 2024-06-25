import { useQuery } from "@apollo/client";
import { ALL_BOOKS, CURRENT_USER } from "../queries";

const Recommend = ({ show }) => {
  const result = useQuery(ALL_BOOKS);
  const userResult = useQuery(CURRENT_USER);

  if (result.loading || userResult.loading) {
    return <div>loading...</div>;
  }

  const books = result.data.allBooks;
  const user = userResult.data.me;

  const booksToShow = books.filter((b) =>
    b.genres.includes(user.favoriteGenre)
  );

  if (!show) return null;

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <strong>{user.favoriteGenre}</strong>"
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToShow.map((a) => (
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
