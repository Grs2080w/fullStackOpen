export default function StatisticLine({ text , value }) {

    return (

        <tr>
            <td>{ text }</td>
            <td>{ value ? value : 0 } {text === 'positive' ? '%' : ''}</td>
        </tr>

    )
    
    
}