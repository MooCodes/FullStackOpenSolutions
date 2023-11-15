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
  const total = props.courseData.reduce((acc, curr) => acc + curr, 0)
  return (
    <div>
      <p>Number of exercises {total}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header name={course} />
      <Content courseData={[part1, part2, part3]}/>
      <Total courseData={[part1.exercises, part2.exercises, part3.exercises]} />
    </div>
  )
}

export default App