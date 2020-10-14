import React, {useEffect, useState} from 'react'
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import axios from 'axios'
import personService from './services/persons'
import Notification from "./components/Notification";

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const [filter, setFilter] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)

    useEffect(() => {
        personService.getAll()
            .then(persons => {
                setPersons(persons)
            })
    }, [])

    const nameChangeHandler = e => {
        setNewName(e.target.value)
    }

    const phoneChangeHandler = e => {
        setNewPhone(e.target.value)
    }

    const filterHandler = e => {
        setFilter(e.target.value)
    }

    const deletePerson = (id, name) => {
        if (window.confirm(`Delete ${name}?`)) {
            personService.deletePerson(id)
                .then(() => {
                    const newPersons = persons.filter(p => p.id !== id)
                    setPersons(newPersons)
                })
                .catch(err => {
                    setErrorMessage(`Information of ${newName} has already been removed from server`)
                    setTimeout(() => {
                        setErrorMessage(null)
                    },3000)
                })
        }
    }

    const submitHandler = (e) => {
        const newPerson = {name: newName, number: newPhone}
        let existingUserID = undefined
        e.preventDefault()
        if (persons.find(p => {
            if (p.name === newName) {
                existingUserID = p.id
                return p.name
            }
        })) {
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                personService.update(existingUserID, newPerson)
                    .then(response => {
                        setPersons(
                            persons.map((person) =>
                                person.id !== response.id ? person : response
                            )
                        )
                    })
                    .catch(err => {
                        setErrorMessage(`Information of ${newName} has already been removed from server`)
                            setTimeout(() => {
                            setErrorMessage(null)
                        },3000)
                    })
            }
        } else {
            const newPerson = {name: newName, number: newPhone}
            personService.create(newPerson)
                .then(person => {
                    setPersons([...persons, person])
                    setSuccessMessage(`Added ${newName}`)
                    setTimeout(() => {
                        setSuccessMessage(null)
                    },3000)
                })
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification error={errorMessage} success={successMessage} />
            <Filter filter={filter}
                    filterHandler={filterHandler}/>
            <h3>Add a new </h3>
            <PersonForm submitHandler={submitHandler}
                        newName={newName}
                        newPhone={newPhone}
                        nameChangeHandler={nameChangeHandler}
                        phoneChangeHandler={phoneChangeHandler}/>
            <h3>Numbers</h3>
            <Persons persons={persons}
                     filter={filter}
                     deletePerson={deletePerson}
            />
        </div>
    )
}

export default App