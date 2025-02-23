//IMC = peso / (altura * altura)

export const calculateImc: (peso: number, altura: number) => string = (peso: number, altura: number) => {
	const imc: number = peso / (altura / 100) ** 2

	if (imc < 18.5) {
		return "Underweight"
	} else if (imc >= 18.5 && imc <= 24.9) {
		return "Normal weight"
	} else if (imc >= 25 && imc <= 29.9) {
		return "Overweight"
	} else if (imc >= 30 && imc <= 34.9) {
		return "Obesity class I"
	} else if (imc >= 35 && imc <= 39.9) {
		return "Obesity class II"
	} else {
		return "Obesity class III"
	}
}

const argsForBmi: string[] = process.argv.slice(2)
const argsForBmiNum: number[] = argsForBmi.map((c) => {
	if (isNaN(Number(c))) {
		throw new Error("All arguments must be numbers")
	} else {
		return Number(c)
	}
})

if (require.main === module) {
	console.log(calculateImc(argsForBmiNum[0], argsForBmiNum[1]))
}
