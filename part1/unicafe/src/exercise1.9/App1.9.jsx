import { useState } from 'react'
import "./App.css"
import Statistics from './statistics'

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad
  const positive = good / all
  const average = (good - bad) / (good + neutral + bad)


  function handleGoodClick() {
    setGood(good + 1)
  }

  function handleNeutralClick() {
    setNeutral(neutral + 1)
  }

  function handleBadClick(){
    setBad(bad + 1)
  }
  return (
    <div>

      <h1>give feedback</h1>
      <div>
         <button onClick={handleGoodClick} className='btn'>good</button>
         <button onClick={handleNeutralClick} className='btn'>neutral</button>
         <button onClick={handleBadClick} className='btn'>bad</button>
      </div>

      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive}/>

    </div>
  )
}

export default App