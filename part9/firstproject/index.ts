import express from "express"
import { calculateImc } from "./bmiCalculator"
import { calcularExercícios } from "./exercícioCalculadora"

const app = express()

app.use(express.json())

app.get("/hello", (_req, res) => {
	res.send("Hello Full Stack!")
})

app.get("/", (_req, res) => {
	res.send({ message: "Hello World" })
})

app.get("/imc/:weight/:height", (req, res) => {
	const weight = Number(req.params.height.substring(7))
	const height = Number(req.params.weight.substring(7))

	if (isNaN(height) || isNaN(weight)) {
		res.status(400).send({ error: "Invalid height or weight, must be numbers" })
	}

	const imc = calculateImc(weight, height)
	res.status(200).send({ height, weight, imc })
})

type Daily = number[]

app.post("/exercises", (req, res) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const { daily_exercises, target } = req.body

	if (!daily_exercises || !target) {
		res.status(400).send({ error: "Missing parameters" })
	}

	if (isNaN(Number(target))) {
		res.status(400).send({ error: "Target must be a number" })
	}
	if (!Array.isArray(daily_exercises)) {
		res.status(400).send({ error: "Daily exercises must be an array" })
	}

	const result = calcularExercícios(daily_exercises as Daily, target as number)
	res.status(200).send(result)
})

app.listen(3000, () => {
	console.log("Server is running on port 3000")
})
