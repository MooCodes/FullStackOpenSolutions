import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    console.log('good clicked')
    setGood(good + 1)
  }


  const handleNeutralClick = () => {
    console.log('neutral clicked')
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    console.log('bad clicked')
    setBad(bad + 1)
  }

  const getAvg = () => (good - bad) / (good + neutral + bad)
  const getPositive = () => good / (good + neutral + bad) * 100

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>

      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {good + neutral + bad}</p>
      <p>average {getAvg()}</p>
      <p>positive {getPositive()} %</p>
    </div>
  )
}

export default App