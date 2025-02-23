interface Results {
	periodLength: number
	trainingDays: number
	success: boolean
	rating: number
	ratingDescription: string
	target: number
	average: number
}

export const calcularExercícios = (arrayDays: number[], target: number): Results => {
	const trainingDays: number = arrayDays.filter((day) => day > 0).length
	const average: number = arrayDays.reduce((acc, curr) => acc + curr, 0) / 7
	const success = (): boolean => {
		return average >= target
	}

	const doYouSucceed: boolean = success()

	let rating: number
	let ratingDescription: string
	if (doYouSucceed && trainingDays >= 5) {
		rating = 3
		ratingDescription = "You did great!"
	} else if (doYouSucceed && trainingDays >= 3) {
		rating = 2
		ratingDescription = "Not too bad but could be better"
	} else {
		rating = 1
		ratingDescription = "You can do better"
	}

	return {
		periodLength: 7,
		trainingDays,
		target,
		average,
		success: success(),
		rating,
		ratingDescription,
	}
}

const argsCMD: string[] = process.argv.slice(2)
const argsForExeNum: number[] = argsCMD.map((c) => {
	if (isNaN(Number(c))) {
		throw new Error("All arguments must be numbers")
	} else {
		return Number(c)
	}
})

if (require.main === module) {
	console.log(calcularExercícios(argsForExeNum, 2))
}
