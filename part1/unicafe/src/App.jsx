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
      <Button onClick={handleGoodClick} text={"good"} />
      <Button onClick={handleNeutralClick} text={"neutral"} />
      <Button onClick={handleBadClick} text={"bad"} />

      <Statistics stats={stats} /> 
    </div>
  )
}

const Button = (props) => {
  return (
    <>
      <button onClick={props.onClick}>{props.text}</button>
    </>
  )
}

const StatisticLine = (props) => {
  if (props.text === "positive") {
    return (
      <div>
        {props.text} {props.stat} %
      </div>
    )
  }
  return (
    <div>
      {props.text} {props.stat}
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
      <StatisticLine text={'good'} stat={good} />
      <StatisticLine text={'neutral'} stat={neutral} />
      <StatisticLine text={'bad'} stat={bad} />
      <StatisticLine text={'all'} stat={good+neutral+bad} />
      <StatisticLine text={'average'} stat={getAvg()} />
      <StatisticLine text={'positive'} stat={getPositive()} />
    </div>
  ) 
}

export default App