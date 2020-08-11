import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CountrySearch = ({ value, onChange }) => {
  return (
    <div>
      <p>
        find countries:
      <input
          value={value}
          onChange={onChange}
        />
      </p>
    </div>
  )
}

const Country = ({ result }) => {
  return (
    <div>
      <h1>{result.name}</h1>
      <p>Capital: {result.capital}</p>
      <p>Population: {result.population}</p>
      <h2>Languages</h2>
      <ul>{result.languages.map(lang => <li key={lang.name}>{lang.name}</li>)}</ul>
      <p><img src={result.flag} height={100} alt='flag' /></p>
    </div>
  )
}

const CountryList = ({ result}) => {
  return (
    <div>{result.map(country => <div key={country.name}>{country.name}</div>)}</div>
  )
}


const App = () => {
  const [searched, setSearched] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
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
        <CountryList result={result} />
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
