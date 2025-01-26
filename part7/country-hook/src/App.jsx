import React, { useState, useEffect } from 'react'

//components
import Country from './components/Country';

//hooks
import { useField } from './hooks/hook';


const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')


  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button type='submit'> find </button>
      </form>

      <Country name={name}/>
    </div>
  )
}

export default App