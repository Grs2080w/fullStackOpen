import { Router } from "express"
import { getDiagnostics } from "../services/patientorsServices"

const diagnosticRouter = Router()

diagnosticRouter.get("/", (_req, res) => {
	const diagnostics = getDiagnostics()
	res.send(diagnostics)
})

export default diagnosticRouter
