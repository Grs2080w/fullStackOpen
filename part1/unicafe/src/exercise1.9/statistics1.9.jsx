export default function Statistics({good, neutral, bad, all, average, positive}) {

    if (all === 0) {
        
        return <p>No feedback given</p>

    } else {

        return (
            <div>
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
    
    
}