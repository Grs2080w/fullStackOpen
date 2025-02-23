import express from "express"
import cors from "cors"

let app = express()

// Routes
import diagnosticRouter from "./routes/diagnosticRouter"
import patientsRouter from "./routes/patientsRouter"

// Middleware
import { errorHandler } from "./middleware/middlewares"

app.use(express.json())
app.use(cors())
app.use("/api/diagnostics", diagnosticRouter)
app.use("/api/patients", patientsRouter)
app.use(errorHandler)

app.listen(3001, function () {
	console.log("Server is running on port 3001")
})
