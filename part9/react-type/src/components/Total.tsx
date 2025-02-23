interface Props {
	totalExercises: number
}

function Total({ totalExercises }: Props) {
	return <p>Number of exercises {totalExercises}</p>
}

export default Total
