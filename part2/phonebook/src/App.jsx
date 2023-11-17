import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleOnChange = (e) => {
    console.log(e.target.value)
    setNewName(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // create a new person    
    const newPerson = { name: newName }

    // check if person already exists
    if (persons.filter(person => person.name === newName).length > 0)
      alert(`${newName} has already been added to the phonebook`)
    else
      setPersons(persons.concat(newPerson))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input 
            value={newName}
            onChange={handleOnChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <div key={person.name}>{person.name}</div>)}
    </div>
  )
}

export default App
