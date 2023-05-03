const Country = ({state}) => {
  return (
    <div key={state.capital}>
      <p>capital - {state.capital}</p>
      <p>area - {state.area}</p>
      <h2>languages</h2>
      <ul>
        {Object.values(state.languages).map(lang => <li key={lang}>{lang}</li>)}
      </ul>
      <img alt="国旗" src={state.coatOfArms.png} />
    </div>
  )
}

export default Country