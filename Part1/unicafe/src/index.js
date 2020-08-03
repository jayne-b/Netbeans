import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Display = ({ good, neutral, bad }) => {
  return (
    <div>
      <p>good: {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad: {bad}</p>
    </div>
  )
}


const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => { setGood(good + 1) }
  const handleNeutralClick = () => { setNeutral(neutral + 1) }
  const handleBadClick = () => { setBad(bad + 1) }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text="good"></Button>
      <Button handleClick={handleNeutralClick} text="neutral"></Button>
      <Button handleClick={handleBadClick} text="bad"></Button>
      <h1>statistics</h1>
      <Display good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)