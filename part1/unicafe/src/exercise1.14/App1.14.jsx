import { useState } from 'react'
import "./App.css"
import AnecdoteMaxVote from './anecdoteMaxVote'


const App = () => {
    
    const anecdotes = [
        'Se fazer algo dói, faça isso com mais frequência.',
        'Contratar mão de obra para um projeto de software que já está atrasado, faz com que se atrase mais ainda!',
        'Os primeiros 90% do código correspondem aos primeiros 10% do tempo de desenvolvimento... Os outros 10% do código correspondem aos outros 90% do tempo de desenvolvimento.',
        'Qualquer tolo escreve código que um computador consegue entender. Bons programadores escrevem código que humanos conseguem entender.',
        'Otimização prematura é a raiz de todo o mal.',
        'Antes de mais nada, depurar é duas vezes mais difícil do que escrever o código. Portanto, se você escrever o código da forma mais inteligente possível, você, por definição, não é inteligente o suficiente para depurá-lo.',
        'Programar sem o uso extremamente intenso do console.log é o mesmo que um médico se recusar a usar raio-x ou testes sanguíneos ao diagnosticar pacientes.',
        'A única maneira de ir rápido é ir bem.'
    ]

    const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0, 0, 0])

    const [selected, setSelected] = useState(0)

    const [anecdoteMaxVotes, setAnecdoteMaxVotes] = useState(0)

    function handleClick() {

        let acnedoteNumber = Math.floor(Math.random() * anecdotes.length)
        setSelected(acnedoteNumber)

    }

    function handleVote(selected) {
        let copy = [...votes]
        copy[selected] += 1
        setVotes(copy)
        let indexAnecdoteMaxVotes = copy.indexOf(Math.max(...copy))
        setAnecdoteMaxVotes(indexAnecdoteMaxVotes) 
    }


  return (

    <div>

        <h1>Anecdote of the day</h1>

        <div className='mb20'>{anecdotes[selected]}</div>
        <div className='ml10'>has {votes[selected]} votes</div>

        <div>
            <button onClick={() => handleVote(selected)} className='btn'>Vote</button>
            <button onClick={handleClick} className='btn'>Next Anecdote</button>
        </div>

        <h1>Anecdote with most votes</h1>

        <AnecdoteMaxVote anecdotes={anecdotes} votes={votes} anecdoteMaxVotes={anecdoteMaxVotes} />


    </div>

  )

}

export default App