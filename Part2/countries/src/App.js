import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './Components/Country'
import CountrySearch from './Components/CountrySearch'
import CountryList from './Components/CountryList'

const App = () => {
  const [searched, setSearched] = useState('')
  const [countries, setCountries] = useState([])
  

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setSearched(event.target.value)
    console.log(result)
  }

  const result = countries.filter(country => {
    return country.name.toLowerCase().includes(searched.toLowerCase());
  });

  const show = (country) => {
    setSearched(country)
  }

  if (result.length === 1) {
    return (
      <div>
        <CountrySearch value={searched} onChange={handleNameChange} />
        <Country result={result[0]} />
      </div>
    )
  } else if (result.length < 10) {
    return (
      <div>
        <CountrySearch value={searched} onChange={handleNameChange} />
        <CountryList result={result} show={show} />
      </div>
    )
  } else if (searched === '') {
    return (
      <div>
        <CountrySearch value={searched} onChange={handleNameChange} />
      </div>
    )
  } else if (result.length >= 10) {
    return (
      <div>
        <CountrySearch value={searched} onChange={handleNameChange} />
          Too many matches, specify another filter
      </div>
    )
  }
}

export default App;
