export default function App() {
    const course = 'Desenvolvimento de aplicação Half Stack'
    const part1 = {
      name: 'Fundamentos da biblioteca React',
      exercises: 10
    }
    const part2 = {
      name: 'Usando props para passar dados',
      exercises: 7
    }
    const part3 = {
      name: 'Estado de um componente',
      exercises: 14
    }
  
    return (
      <div>
        <h1>{course}</h1>
        <p>{part1.name} {part1.exercises}</p>
        <p>{part2.name} {part2.exercises}</p>
        <p>{part3.name} {part3.exercises}</p>
        <p>Total of exercises {part1.exercises + part2.exercises + part3.exercises}</p>
      </div>
    )
  }