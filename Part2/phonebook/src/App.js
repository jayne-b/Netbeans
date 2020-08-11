import React, { useState, useEffect } from 'react'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showSearched, setShowSearched] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (!checkNameExists(newName)) {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    } else {
      window.alert(`${newName} is already added to the phonebook`)
    }
  }

  const peopleToShow = persons.filter(person => {
    return person.name.toLowerCase().includes(showSearched.toLowerCase());
  });

  
  const checkNameExists = (name) => {
    return persons.some(person => person.name === name)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameSearched = (event) => {
    setShowSearched(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={showSearched} onChange={handleNameSearched} />
      <h2>add a new</h2>
      <PersonForm onSubmit={addPerson} valueName={newName} onChangeName={handleNameChange} valueNumber={newNumber}
      onChangeNumber={handleNumberChange} />     
      <h2>Numbers</h2>
      <div>
        <Persons people={peopleToShow} />
      </div>
    </div>
  )
}

export default App