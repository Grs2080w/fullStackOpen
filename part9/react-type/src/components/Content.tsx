import Part from "./Part"
import CoursePart from "../types/types"

interface Props {
	courseParts: CoursePart[]
}

function Content({ courseParts }: Props) {
	return (
		<div>
			{courseParts.map((part, index) => {
				return <Part key={index} part={part} />
			})}
		</div>
	)
}

export default Content
