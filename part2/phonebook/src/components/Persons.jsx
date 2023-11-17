const Person = (props) =>
    <div key={props.name}>{props.name} {props.number}</div>

const Persons = (props) =>
  props.persons.map(person => <Person name={person.name} number={person.number} key={person.id} />)

export default Persons