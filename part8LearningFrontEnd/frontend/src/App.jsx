import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import { ALL_PERSONS } from "./queries";
import PhoneForm from "./components/PhoneForm";

function App() {
  const [errorMessage, setErrorMessage] = useState(null);

  const { loading, error, data } = useQuery(ALL_PERSONS, {
    pollInterval: 2000,
  });

  if (loading) return <>Loading...</>;
  if (error) return <>Error</>;

  const notify = (message) => {
    console.log("yoo");
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  return (
    <div>
      <Notify errorMessage={errorMessage} />
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
