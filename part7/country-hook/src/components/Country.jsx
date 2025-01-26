import { useCountry} from "../hooks/hook"

const Country = ({name}) => {

    const country = useCountry(name)
    
    if (!country.country) {
      return null
    }

    let countryName = country.country.data
    
    
    if (!country.found) {

      return (
        <div>
          not found...
        </div>
      )
    }
  
    return (
      <div>
        <h2>{countryName.name.common} </h2>
        <div>Capital ➡️ {countryName.capital[0]} </div>
        <div>Population ➡️ {countryName.population}</div> 
        <img style={{marginTop: '20px'}} src={countryName.flags.png} height='100' alt={`flag of ${countryName.name.common}`}/>  
      </div>
    )
}


export default Country;