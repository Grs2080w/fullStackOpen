//hooks
import { useField, useResource } from './hooks/hook'


const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('/notes')
  const [persons, personService] = useResource('/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService({ content: content.value })
    content.onReset()
    
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService({ name: name.value, number: number.value})
    name.onReset()
    number.onReset()
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>

      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>

      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App