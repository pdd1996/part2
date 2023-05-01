const Filter = (props) => {
  const {value, onChange, list} = props
  return (
    <>
      <input value={value} onChange={onChange} />
      <div>
        {
          list.map(person => <p key={person.id}>{person.name}</p>)
        }
      </div>
    </>
  )
}

export default Filter