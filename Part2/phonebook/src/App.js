import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')


  const addPerson = (event) => {
    event.preventDefault()
    if (!checkNameExists(newName)) {
      const personObject = {
        name: newName,
        number: newNumber
      }
      console.log(checkNameExists(newName))
      setPersons(persons.concat(personObject))
      console.log(personObject)
      setNewName('')
      setNewNumber('')
    } else {
      console.log(checkNameExists(newName))
      window.alert(`${newName} is already added to the phonebook`)
    }
  }

  const checkNameExists = (name) => {
    return persons.some(person => person.name === name)
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name:
          <input
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>number:
          <input
            value={newNumber}
            onChange={handleNumberChange}
          /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p>{person.name} {person.number}</p>)}
    </div>
  )
}

export default App