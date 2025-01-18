import {actionGood, actionBad, actionOk, actionZero} from './Actions'
import { useSelector , useDispatch } from 'react-redux'

export default function App() {

    const dispatch = useDispatch()
    const gboz = useSelector(state => state)


    const good = () => {
        dispatch(actionGood())
    }

    const bad = () => {
        dispatch(actionBad())
    }

    const ok = () => {
        dispatch(actionOk())
    }

    const reset = () => {
        dispatch(actionZero())
    }

    return (
    <div>
        <button onClick={good}>good</button> 
        <button onClick={ok}>ok</button> 
        <button onClick={bad}>bad</button>
        <button onClick={reset}>reset stats</button>


    <div>good {gboz.good}</div>
        <div>ok {gboz.ok}</div>
        <div>bad {gboz.bad}</div>
    </div>
    )
}
