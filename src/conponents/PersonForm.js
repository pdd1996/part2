const PersonForm = (props) => {
  const { onSubmit,name ,number ,toggleName ,toggleNumber } = props

  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={name} onChange={toggleName} />
      </div>
      <div>
        number: <input value={number} onChange={toggleNumber} />
      </div>
      <div>
        <button type="submit" >add</button>
      </div>
    </form>
  )
}

export default PersonForm