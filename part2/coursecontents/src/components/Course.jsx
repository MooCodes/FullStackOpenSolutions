const Header = ({ course }) => <h2>{course.name}</h2>

const Total = ({ sum }) => <p><strong>total of {sum} exercises</strong> </p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(part => <Part part={part} key={part.id} />)}      
  </>

const Course = ({ course }) => {
  return (
    <>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total sum={course.parts.reduce((acc, curr) => acc + curr.exercises , 0)} />
    </>
  )
}

export default Course