import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS);

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  const authors = result.data ? result.data.allAuthors : [];

  console.log(authors);

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <EditBirthYear authors={authors} editAuthor={editAuthor} />
    </div>
  );
};

const EditBirthYear = ({ authors, editAuthor }) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    console.log("update author...");
    console.log(name, born);
    editAuthor({ variables: { name, setBornTo: Number(born) } });
  };

  return (
    <form onSubmit={submit}>
      <h2>Set Birthyear</h2>
      <div>
        <select onChange={(e) => setName(e.target.value)}>
          {authors.map((a) => (
            <option key={a.name} value={a.name}>
              {a.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        born{" "}
        <input value={born} onChange={({ target }) => setBorn(target.value)} />
      </div>
      <button>update author</button>
    </form>
  );
};

export default Authors;
