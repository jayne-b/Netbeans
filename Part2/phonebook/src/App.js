import React, { useState, useEffect } from 'react'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'
import personService from './services/persons'
import Notification from './Components/Notification'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [showSearched, setShowSearched] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [successful, setSuccessful] = useState(true)

    useEffect(() => {
        personService
            .getAll()
            .then(initialPeople => {
                setPersons(initialPeople)
            })
            .catch(e => {
                console.log('get error', e)
            })
    }, [])


    const deletePerson = (person) => {
        if (window.confirm(`Delete ${person.name}?`)) {
            personService
                .remove(person.id)
                .then(() => {
                    console.log('deleted', person)
                    setPersons(persons.filter(p => p.id !== person.id))
                })
                .catch(e => {
                    console.log('delete error', e)
                })
        }
    }

    const addPerson = (event) => {
        event.preventDefault()
        const foundPerson = persons.find(p => p.name === newName)
        if (!checkNameExists(newName)) {
            const personObject = {
                name: newName,
                number: newNumber,
                id: persons.length + 1
            }

            personService
                .create(personObject)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setNewName('')
                    setNewNumber('')
                    setErrorMessage(`Added ${personObject.name}`)
                    setSuccessful(true)
                    setTimeout(() => {
                        setErrorMessage(null)
                    }, 5000)
                })
                .catch(e => {
                    console.log('add error', e)
                })

        } else {
            update(foundPerson, newNumber)

        }
    }

    const update = (person, newNumber) => {
        if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
            const editedPerson = { ...person, number: newNumber }
            console.log('edited', editedPerson)
            personService
                .update(person.id, editedPerson)
                .then(() => {
                    setPersons(persons.map(person => person.id === editedPerson.id ? editedPerson : person))
                    setNewNumber('')
                    setNewName('')
                })
                .catch(e => {
                    setErrorMessage(`Information of ${person.name} has already been removed from server`)
                    setSuccessful(false)
                    setTimeout(() => {
                        setErrorMessage(null)
                    }, 5000)                    
                    personService
                        .getAll()
                        .then(initialPeople => {
                            setPersons(initialPeople)
                        })
                })
        }
    }

    const peopleToShow = () => {
        if (showSearched === '') {
            return persons
        }
        return persons.filter(person => person.name.toLowerCase().includes(showSearched.toLowerCase()))

    }

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
            <Notification message={errorMessage} successful={successful} />
            <Filter value={showSearched} onChange={handleNameSearched} />
            <h2>add a new</h2>
            <PersonForm onSubmit={addPerson} valueName={newName} onChangeName={handleNameChange} valueNumber={newNumber}
                onChangeNumber={handleNumberChange} />
            <h2>Numbers</h2>
            <div>
                <Persons people={peopleToShow()} deletePerson={deletePerson} />
            </div>
        </div>
    )
}

export default App