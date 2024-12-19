export default function Total({parts}){
    let total = 0
    parts.forEach(part => total += part.exercises)
    return(<p>total of exercises {total}</p>)
}