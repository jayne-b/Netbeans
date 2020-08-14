import React from 'react'

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

export default Country