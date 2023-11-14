const Header = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <p>
        {props.title} {props.exercise}
      </p>
    </div>
  )
}

const Total = (props) => {
  const total = props.totalArr.reduce((acc, curr) => acc + curr, 0)
  return (
    <div>
      <p>Number of exercises {total}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header name={course} />
      <Content title={part1} exercise={exercises1}/>
      <Content title={part2} exercise={exercises2}/>
      <Content title={part3} exercise={exercises3}/>
      <Total totalArr={[exercises1, exercises2, exercises3]} />
    </div>
  )
}

export default App