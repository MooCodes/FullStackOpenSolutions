const Person = (props) => (
  <div key={props.name}>
    {props.name} {props.number}{" "}
    <button onClick={props.onDeletePerson}>delete</button>{" "}
  </div>
);

const Persons = (props) =>
  props.persons.map((person) => (
    <Person
      name={person.name}
      number={person.number}
      key={person.id}
      onDeletePerson={() => props.onDeletePerson(person.id)}
    />
  ));

export default Persons;
