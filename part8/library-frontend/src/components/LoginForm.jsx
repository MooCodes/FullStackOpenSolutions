import { useState, useEffect } from "react";
import { useMutation, useLazyQuery } from "@apollo/client";
import { LOGIN, CURRENT_USER } from "../queries";

const LoginForm = ({ setToken, show, setPage, setFavoriteGenre }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loadUser, { data: userData }] = useLazyQuery(CURRENT_USER, {
    fetchPolicy: "network-only",
  });

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
      console.log("loading user...");
      loadUser();
    }
  }, [result.data]);

  useEffect(() => {
    if (userData) {
      console.log("settings favorite genre...", userData);
      if (userData.me) setFavoriteGenre(userData.me.favoriteGenre);
    }
  }, [userData]);

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
