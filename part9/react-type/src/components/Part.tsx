import CoursePart from "../types/types"

interface Props {
	part: CoursePart
}

function jsxReturn(part: CoursePart, txt: string, txt2?: string) {
	return (
		<p>
			<b>
				{part.name} {part.exerciseCount}
			</b>
			<br />
			<i>{txt}</i>
			<br />
			{txt2 ? <i>{txt2}</i> : null}
		</p>
	)
}

export default function Part({ part }: Props) {
	switch (part.kind) {
		case "basic":
			return <>{jsxReturn(part, `${part.description}`)}</>

		case "group":
			return <>{jsxReturn(part, `project exercises ${part.groupProjectCount}`)}</>

		case "background":
			return <>{jsxReturn(part, `${part.description}`, `${part.backgroundMaterial}`)}</>
		case "special":
			return <> {jsxReturn(part, `${part.description}`, `required skils: ${part.requirements}`)}</>
	}
}
