import {useEffect, useState} from 'react'
import Filter from "./conponents/Filter";
import PersonForm from "./conponents/PersonForm";
import Persons from "./conponents/Persons";
import personService from './services/persons'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [phone, setPhone] = useState('')
  const [filterName, setFilterName] = useState('')
  const [personList, setPersonList] = useState([])
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    personService
      .getAll()
      .then(res => {
        setPersons(res.data)
      })
      .catch(e => {
        console.log(e)
      })
  }, [])

  const handleChange = (e) => {
    setNewName(e.target.value)
  }

  const handleChangeToPhone = (e) => {
    setPhone(e.target.value)
  }

  const addPerson = (e) => {
    e.preventDefault()
    const person = {
      name: newName,
      number: phone,
      id: persons.length + 1
    }
    const isExist = persons.some(person => {
      if (person.name === newName) {
        alert(`${newName} is already added to phonebook, replace the old number with a new one`)
        return true;
      }
      return false
    })

    const personToFilter = persons.filter(person => {
      if (person.name === newName) {
        return person.id
      }
      return ''
    })

    if (personToFilter.length) {
      personService
        .update(personToFilter[0].id, person)
        .then(res => {
          const newPersons = persons.map(person => {
          return person.id === Number(res.data.id) ? res.data : person
          })
          setPersons(newPersons)
        })
        .catch(e => {
          setNewName(person.name)
          setShowError(true)
          sleep(3000)
            .then(() => setShowError(false))
            .finally(() => {
              setNewName('')
              setPhone('')
            })
          console.log(e)
        })

      setNewName('')
      setPhone('')
    }

    if(!isExist) {
      personService
        .create(person)
        .then(res => {
          setPersons(persons.concat(res.data))
          setNewName(res.data.name)
          setShowSuccess(true)
          sleep(3000)
            .then(() => setShowSuccess(false))
            .finally(() => {
              setNewName('')
              setPhone('')
            })
        })
        .catch(e => {
          console.log(e)
        })
      setNewName('')
      setPhone('')
    }
  }

  const sleep = (millisecond) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, millisecond)
    })
  }

  const toggleName = (e) => {
    setFilterName(e.target.value)
    const personList = persons.filter(person => {
        // 都转成大写或者小写
        return person.name.toUpperCase().match(e.target.value.toUpperCase())
      }
    )
    setPersonList(personList)
  }

  const handleClick = (e) => {
    const id = Number(e.target.id)
    if(id) {
      // eslint-disable-next-line no-restricted-globals
      const isConfirm = confirm("Press OK to delete this one");
      if(isConfirm) {
        personService
          .remove(id)
          .then(res => {
            if(res.status === 200) {
              const newPersons = persons.filter(person => {
                return person.id !== id
              })
              setPersons(newPersons)
            }
          })
      }
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {
        showSuccess ?  <div><h2 className="info">Added {newName}</h2></div> : ''
      }
      {
        showError ? <div><h2 className="error">Added {newName} error, {newName} has already been removed from server</h2></div> : ''
      }
      <div>
        <p>filter shown with</p>
        <Filter value={filterName} onChange={toggleName} list={personList} />
      </div>
      <h2>add a new</h2>
      <PersonForm onSubmit={addPerson} toggleName={handleChange} toggleNumber={handleChangeToPhone} name={newName} number={phone} />
      <h2>Numbers</h2>
      <Persons values={persons} onClick={e => handleClick(e)} />
    </div>
  )
}

export default App