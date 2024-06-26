import { useEffect, useState } from "react";
import { gql, useQuery, useLazyQuery, useApolloClient } from "@apollo/client";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import { ALL_PERSONS, CURRENT_USER } from "./queries";
import PhoneForm from "./components/PhoneForm";
import LoginForm from "./components/LoginForm";

function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const { loading, error, data } = useQuery(ALL_PERSONS);
  const client = useApolloClient();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  if (loading) return <>Loading...</>;
  if (error) return <>Error</>;

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };



  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.clear();
    client.resetStore();
  };

  if (user) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h1>Hello {user.username}</h1>
        <button onClick={logout}>Logout </button>
        <Persons persons={data.allPersons} />
        <PersonForm setError={notify} />
        <PhoneForm setError={notify} />
      </div>
    );
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <LoginForm setUser={setUser} setToken={setToken} />
      <PersonForm setError={notify} />
      <Persons persons={data.allPersons} />
      <PhoneForm setError={notify} />
    </div>
  );
}

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }
  return <div style={{ color: "red" }}>{errorMessage}</div>;
};

export default App;
