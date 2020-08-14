import React from 'react'

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

export default CountrySearch