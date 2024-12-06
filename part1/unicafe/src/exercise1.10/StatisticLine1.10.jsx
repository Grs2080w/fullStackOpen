export default function StatisticLine({ text , value }) {

    return (
        <p>{ text } { value ? value : 0 }</p>
    )
    
    
}