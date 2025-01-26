import { useState } from 'react'
import { Routes, Route, useMatch } from 'react-router-dom'

//Components
import AnecdoteList from './components/AnecdotesList'
import CreateNew from './components/CreateNew'
import About from './components/About'
import Footer from './components/Footer'
import Note from './components/Note'
import Menu from './components/Menu'

const App = () => {
  const [notification, setNotification] = useState(null)
  notification ? setTimeout(() => setNotification(null), 5000) : null

  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1,
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2,
    },
  ])

  let match = useMatch('/anecdotes/:id')
  let note = match ? anecdotes.find((n) => n.id === Number(match.params.id)) : null

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />

      <div>{notification}</div>

      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/create" element={<CreateNew anecdotes={anecdotes} setAnecdotes={setAnecdotes} setNotification={setNotification} />} />
        <Route path="/about" element={<About />} />
        <Route path="/anecdotes/:id" element={<Note note={note} />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
