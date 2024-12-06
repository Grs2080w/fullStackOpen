export default function Button({ text, functionToCall }) {
    return (
        <button onClick={functionToCall} className="btn">{ text }</button>
    )
}