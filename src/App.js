import {useEffect, useRef, useState} from 'react'
import Filter from "./conponents/Filter";
import PersonForm from "./conponents/PersonForm";
import Persons from "./conponents/Persons";
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [phone, setPhone] = useState('')
  const [filterName, setFilterName] = useState('')
  const [personList, setPersonList] = useState([])
  const refList = useRef([]);

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
    const isExist = persons.some(person => {
      if (person.name === newName) {
        alert(`${newName} is already added to phonebook`)
        return true;
      }
      return false
    })

    if(!isExist) {
      const person = {
        name: newName,
        number: phone,
        id: persons.length + 1
      }
      personService
        .create(person)
        .then(res => {
          setPersons(persons.concat(res.data))
        })
        .catch(e => {
          console.log(e)
        })
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

  // ref 存在问题
  const getRef=(dom)=>{
    return refList.current.push(dom)
  }

  const handleClick = () => {
    // console.log(personRef.current, "ref")
    console.log(refList, "refList")
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
      <Persons values={persons} ref={getRef()} onClick={handleClick} />
    </div>
  )
}

export default App