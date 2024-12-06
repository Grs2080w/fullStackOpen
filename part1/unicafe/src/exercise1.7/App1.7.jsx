import { useState } from 'react'
import "./App1.7.css"

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

      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {average ? average : 0}</p>
      <p>positive {positive ? positive : 0} %</p>

    </div>
  )
}

export default App