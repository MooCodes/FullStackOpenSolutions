import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries";

const LoginForm = ({ setToken, show, setPage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    console.log("hello from useEffect", result.data);
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("user-token", token);
    }
  }, [result.data]);

  const submit = async (event) => {
    event.preventDefault();

    login({ variables: { username, password } });
    setPage("authors");
  };

  if (!show) return null;

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;