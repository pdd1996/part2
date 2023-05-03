import {useState} from "react";
import axios from "axios";
import Country from "./conponents/Country";

const App = () => {
  const [country, setCountry] = useState('')
  const [countries, setCountries] = useState([])
  const [info, setInfo] = useState('')
  const [show, setShow] = useState(false)

  const toggleCountry = (e) => {
    const value = e.target.value
    console.log(value, "value")
    setCountry(value)
    if (value) {
      getAllCountries(value)
    }
    if (!value) {
      setCountries([])
      setInfo('')
    }
  }

  const handleClick = () => {
    setShow(!show)
  }

  const getAllCountries = (value) => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(res => {
        const listForCountry = res.data
        const remaining = listForCountry.filter(country => country.name.common.toUpperCase().match(value.toUpperCase()))
        console.log(remaining, "remaining")
        if (remaining.length === 0) {
          setCountries([])
          setInfo('not found')
        }
        if(remaining.length > 10) {
          setCountries([])
          setInfo('Too many match, specify another filter')
        }
        if (remaining.length <= 10 && remaining.length >= 1) {
          setCountries(remaining)
          setInfo('')
        }
      })
  }

  return (
    <div>
      <p>find countries <input value={country} onChange={toggleCountry} /></p>
      {
        info && countries.length === 0 ? info : countries.map(state => <p key={state.capital}>{state.name.common}<button onClick={handleClick}>show</button></p> )
      }
      {
        countries.length === 1 ? countries.map(state =>
          <Country state={state} />
        ) : ''
      }
    </div>
  )
}

export default App