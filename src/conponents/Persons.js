const Persons = ({values}) => {
  return (
    <>
      {
        values.map(person => <p key={person.id}>{person.name} - {person.phone}</p>)
      }
    </>
  )
}

export default Persons;