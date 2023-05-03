const Persons = ({values}) => {
  return (
    <>
      {
        values.map(person => <p key={person.id}>{person.name} - {person.number}</p>)
      }
    </>
  )
}

export default Persons;