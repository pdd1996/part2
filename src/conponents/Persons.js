const Persons = (props) => {
  const { values, onClick } = props
  return (
    <>
      {
        values.map(person =>
          <p key={person.id}>{person.name} - {person.number}
            <button id={person.id} onClick={onClick}>delete</button>
          </p>)
      }
    </>
  )
}

export default Persons;