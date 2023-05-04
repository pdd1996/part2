const Persons = ({values, onClick}) => {

  return (
    <>
      {
        values.map(person => <p key={person.id}>{person.name} - {person.number}
          <button onClick={onClick}>delete</button>
        </p>)
      }
    </>
  )
}

export default Persons;