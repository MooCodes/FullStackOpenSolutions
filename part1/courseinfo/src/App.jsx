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
      {props.courseData.parts.map((data) => <Part key={data.name} title={data.name} exercise={data.num} />)}
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
  const total = props.totalArr.reduce((acc, curr) => acc + curr, 0)
  return (
    <div>
      <p>Number of exercises {total}</p>
    </div>
  )
}

const App = () => {
  const courseData = {
    name: 'Half Stack application development',
    parts: [ 
      {name: "Fundamentals of React", num: 10},
      {name: "Using props to pass data", num: 7},
      {name: "State of a component", num: 14}, 
    ]
  }

  const course = 'Half Stack application development'

  return (
    <div>
      <Header name={course} />
      <Content courseData={courseData}/>
      <Total totalArr={[courseData.parts[0].num, courseData.parts[1].num, courseData.parts[2].num]} />
    </div>
  )
}

export default App