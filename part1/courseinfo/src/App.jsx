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
      {props.courseData.map((data) => <Part key={data.name} title={data.name} exercise={data.exercises} />)}
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>
        {props.title} {props.exercise}
      </p>
    </div>
  )
}

const Total = (props) => {
  const total = props.courseData.reduce((acc, curr) => acc + curr.exercises, 0)
  return (
    <div>
      <p>Number of exercises {total}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header name={course} />
      <Content courseData={parts}/>
      <Total courseData={parts} />
    </div>
  )
}

export default App