import { useState } from 'react'
import Filter from "./conponents/Filter";
import PersonForm from "./conponents/PersonForm";
import Persons from "./conponents/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [phone, setPhone] = useState('')
  const [filterName, setFilterName] = useState('')
  const [personList, setPersonList] = useState([])

  const handleChange = (e) => {
    setNewName(e.target.value)
  }

  const handleChangeToPhone = (e) => {
    setPhone(e.target.value)
  }

  const addPerson = (e) => {
    e.preventDefault()
    const isExist = persons.some(person => {
      if (person.name === newName) {
        alert(`${newName} is already added to phonebook`)
        return true;
      }
      return false
    })

    if(!isExist) {
      setPersons(persons.concat({
        name: newName,
        phone,
        id: persons.length + 1
      }))
      setNewName('')
      setPhone('')
    }
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

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <p>filter shown with</p>
        <Filter value={filterName} onChange={toggleName} list={personList} />
      </div>
      <h2>add a new</h2>
      <PersonForm onSubmit={addPerson} toggleName={handleChange} toggleNumber={handleChangeToPhone} name={newName} number={phone} />
      <h2>Numbers</h2>
      <Persons values={persons} />
    </div>
  )
}

export default App