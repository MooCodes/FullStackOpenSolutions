import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0, 0, 0])
  const [index, setIndex] = useState(0)

  const handleNextAnecdote = () => {
    const newIndex = getRandomInt(anecdotes.length)
    setIndex(newIndex)
    setSelected(newIndex)
  }

  const handleVote = () => {
    const newPoints = [...points]
    newPoints[index] += 1
    setPoints(newPoints)
  }

  return (
    <div>
      {anecdotes[selected]} <br></br>
      has {points[selected]} votes
      <div>
        <button onClick={handleVote}>vote</button>
        <button onClick={handleNextAnecdote}>next anecdote</button>
      </div>
    </div>
  )
}

const VoteButton = (props) => {
  return (
    <div>
      <button onClick={props.onClick}>vote</button>
    </div>
  )
}

const Button = (props) => {
  return (
    <div> 
      <button onClick={() => props.setSelected(getRandomInt(props.length))}>next anecdote</button>
    </div>
  )
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export default App