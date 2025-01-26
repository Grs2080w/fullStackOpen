import { useState , useEffect } from "react"
import axios from "axios"

import countries from "../countries/countries.js"

const useCountry = (name) => {

    let URL = "https://studies.cs.helsinki.fi/restcountries/api/name"

    const [country, setCountry] = useState(null)
  
    useEffect(() => {
        async function fetchCountry() {
   
            if (name !== '') {
                await axios.get(`${URL}/${name}`).then(res => setCountry(res))
                .catch(error => setCountry('not found'))
                
            }
        }

        if (name !== '') {

            let res = countries.find(country => {
                if (country === name.charAt(0).toUpperCase() + name.slice(1)) {
                    return true
                }
            })

            res ? fetchCountry() : setCountry('not found')

        }


    }, [name])

    let found = (country !== 'not found') && (country !== null) ? true : false;
  
    return { country, found }
}


const useField = (type) => {

    const [value, setValue] = useState('')
  
    const onChange = (event) => {
      setValue(event.target.value)
    }
  
    return {
      type,
      value,
      onChange
    }
}

export {
    useCountry,
    useField
}