export default function AnecdoteMaxVote({   anecdotes, votes, anecdoteMaxVotes }) {
    if (votes[anecdoteMaxVotes] === 0 ){

        return (
            <p className="ml50">No votes...</p>
        )

    } else {

        return (
            <div className="ml20">
                <p>{anecdotes[anecdoteMaxVotes]}</p>
                <p className='ml30'>has {votes[anecdoteMaxVotes]} votes</p>
            </div>
        )

    }
}