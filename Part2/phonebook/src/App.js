import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')


  const addPerson = (event) => {
    event.preventDefault()
    if (!checkNameExists(newName)) {
      const personObject = {
        name: newName
      }
      console.log(checkNameExists(newName))
      setPersons(persons.concat(personObject))
      console.log(personObject)
      setNewName('')
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
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p>{person.name}</p>)}
    </div>
  )
}

export default App