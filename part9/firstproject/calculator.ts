type Operation = "sum" | "sub" | "mul" | "div"
type Result = number | string

const Calculator = (a: number, b: number, op: Operation): Result => {
	switch (op) {
		case "sum":
			return a + b
		case "sub":
			return a - b
		case "mul":
			return a * b
		case "div":
			if (b === 0) {
				throw new Error("Division by zero")
			}
			return a / b
		default:
			throw new Error("Invalid operation")
	}
}

interface Args {
	value1: number
	value2: number
	op: Operation
}

const parseArgs = (args: string[]): Args => {
	if (args.length < 3) {
		throw new Error("Not enough arguments")
	} else if (isNaN(Number(args[0])) || isNaN(Number(args[1]))) {
		throw new Error("Use numbers to calculate")
	} else if (args.length > 3) {
		throw new Error("Too many arguments")
	} else {
		return {
			value1: Number(args[0]),
			value2: Number(args[1]),
			op: args[2] as Operation,
		}
	}
}

const args: Args = parseArgs(process.argv.slice(2))

const a: number = Number(args.value1)
const b: number = Number(args.value2)
const op: Operation = args.op

try {
	console.log(Calculator(a, b, op))
} catch (error) {
	if (error instanceof Error) {
		console.log("New Error: " + error.message)
	}
}
