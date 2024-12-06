import { useState } from 'react'
import "./App.css"
import StatisticLine from './StatisticLine1.11'
import Button from './button1.11'

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad
  const positive = (good / all) * 100
  const average = ((good - bad) / (good + neutral + bad)) * 10


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
         <Button functionToCall={handleGoodClick} text="good"/>
         <Button functionToCall={handleNeutralClick} text="neutral"/>
         <Button functionToCall={handleBadClick} text="bad"/>
      </div>

      <h1>statistics</h1>
      
      <table>
        <StatisticLine text="good" value={good}/>
        <StatisticLine text="neutral" value={neutral}/>    
        <StatisticLine text="bad" value={bad}/>
        <StatisticLine text="all" value={all}/>
        <StatisticLine text="average" value={average}/>
        <StatisticLine text="positive" value={positive}/>
      </table>
      
    </div>
  )
}

export default App