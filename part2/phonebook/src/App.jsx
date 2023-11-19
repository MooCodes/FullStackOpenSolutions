import { useEffect, useState } from "react";
import "./index.css";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [notificationMsg, setNotificationMsg] = useState(null);
  const [notificationClassName, setNoficiationClassName] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const onDeletePerson = (id) => {
    const personToDelete = persons.find((person) => person.id === id);

    if (window.confirm(`Delete ${personToDelete.name}?`))
      personService.deletePerson(id).then((deletedPerson) => {
        console.log("deleted ", personToDelete, deletedPerson);
        const newPersonList = persons.filter((person) => person.id !== id);
        setPersons(newPersonList);
      })
      .catch(err => {
        console.log('error has occured', err);
        setNotificationMsg(`Information of ${personToDelete.name} has already been deleted`);
        setNoficiationClassName("error");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // create a new person
    const newPerson = { name: newName, number: newNumber };

    // check if person already exists
    if (persons.filter((person) => person.name === newName).length > 0) {
      const prompt = `${newName} has already been added to the phonebook, replace the old number with a new one?`;
      if (confirm(prompt)) {
        // find the person
        const personToUpdate = persons.find(
          (person) => person.name === newName
        );
        // change the person's number
        const updatedPerson = { ...personToUpdate, number: newNumber };

        personService
          .update(personToUpdate.id, updatedPerson)
          .then((returnedPerson) => {
            console.log(`Updated ${returnedPerson.name}'s phone number`);
            setPersons(
              persons.map((person) =>
                person.id !== personToUpdate.id ? person : returnedPerson
              )
            );
            setNotificationMsg(`Updated ${returnedPerson.name}'s phone number`);
            setNoficiationClassName("success");
            setTimeout(() => {
              setNotificationMsg(null);
            }, 3000);
          });
      }
    } else {
      personService.create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        // reset input fields
        setNewName("");
        setNewNumber("");

        setNotificationMsg(`Added ${returnedPerson.name}`);
        setNoficiationClassName("success");
        setTimeout(() => {
          setNotificationMsg(null);
        }, 3000);
      });
    }
  };

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().match(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        className={notificationClassName}
        message={notificationMsg}
      />
      <Filter searchTerm={searchTerm} onChange={handleSearchChange} />
      {/* filter shown with <input value={searchTerm} onChange={handleSearchChange} /> */}
      <h3>add a new</h3>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} onDeletePerson={onDeletePerson} />
    </div>
  );
};

export default App;
