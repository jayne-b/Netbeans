import React from 'react'

const CountryList = ({ result, show }) => {
    return (
        <div>{result.map(country => <div key={country.name}>{country.name}<button value={country.name} onClick={() => show(country.name)}>show</button></div>)}</div>
    )
}

export default CountryList