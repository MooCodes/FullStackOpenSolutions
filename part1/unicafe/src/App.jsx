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



  const stats = {
    good: good,
    neutral: neutral,
    bad: bad,
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>

      <Statistics stats={stats}/> 
    </div>
  )
}

const Statistics = (props) => {
  const good = props.stats.good
  const neutral = props.stats.neutral
  const bad = props.stats.bad

  const getAvg = () => (good - bad) / (good + neutral + bad)
  const getPositive = () => good / (good + neutral + bad) * 100

  if (good + neutral + bad === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <h1>statistics</h1>
      <p>good {good} <br></br> 
      neutral {neutral} <br></br> 
      bad {bad} <br></br> 
      all {good + neutral + bad} <br></br> 
      average {getAvg()} <br></br>
      positive {getPositive()} %</p>
    </div>
  ) 
}

export default App