import {useState} from "react";
import axios from "axios";
import Country from "./conponents/Country";

const App = () => {
  const [country, setCountry] = useState('')
  const [countries, setCountries] = useState([])
  const [info, setInfo] = useState('')
  const [showCountries, setShowCountries] = useState([])

  const toggleCountry = (e) => {
    const value = e.target.value
    setCountry(value)
    if (value) {
      getAllCountries(value)
    }
    if (!value) {
      setCountries([])
      setInfo('')
    }
  }

  const handleClick = (e) => {
    const id = e.target.id
    if (id) {
      const country = countries.map(country => {
        if(country.name.common.toUpperCase() === id.toUpperCase()) {
          country.show = !country.show
        }
        return country
      })
      setShowCountries(country)
    }
  }

  const getAllCountries = (value) => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(res => {
        const listForCountry = res.data
        listForCountry.forEach(function (country) {
          country.show = false
        })
        const remaining = listForCountry.filter(country => country.name.common.toUpperCase().match(value.toUpperCase()))
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
        info && countries.length === 0 ? info : countries.map(state =>
          <p key={state.capital}>{state.name.common}
            <button id={state.name.common} onClick={e => handleClick(e)}>{state.show ? 'not show' : 'show'}</button>
          </p>
        )
      }
      {
        showCountries.map(state => {
          if (state.show) {
            return(
              <div key={state.capital}>
                <Country state={state} />
              </div>
            )
          }
        })
      }
    </div>
  )
}

export default App