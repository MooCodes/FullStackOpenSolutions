import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const onDeletePerson = (id) => {
    const personToDelete = persons.find(person => person.id === id)

    if (window.confirm(`Delete ${personToDelete.name}?`))
      personService
        .deletePerson(id)
        .then(deletedPerson => {
          console.log('deleted ', personToDelete, deletedPerson)
          const newPersonList = persons.filter(person => person.id !== id)
          setPersons(newPersonList)
        })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // create a new person    
    const newPerson = { name: newName, number: newNumber }

    // check if person already exists
    if (persons.filter(person => person.name === newName).length > 0)
      alert(`${newName} has already been added to the phonebook`)
    else {
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          // reset input fields
          setNewName('')
          setNewNumber('')
        })
    }

  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().match(searchTerm.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
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
      <Persons 
        persons={personsToShow}
        onDeletePerson={onDeletePerson}
      />
    </div>
  )
}

export default App
