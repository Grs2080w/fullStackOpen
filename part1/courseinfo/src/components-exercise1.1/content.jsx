import Part1 from "../components-exercise1.2/part1"
import Part2 from "../components-exercise1.2/part2"
import Part3 from "../components-exercise1.2/part3"

export default function Content({part1, part2, part3, exercises1, exercises2, exercises3}) {
    return (
        <div>
            <Part1 part1={part1} exercises1={exercises1}/>
            <Part2 part2={part2} exercises2={exercises2}/>
            <Part3 part3={part3} exercises3={exercises3}/>
        </div>
    )
}