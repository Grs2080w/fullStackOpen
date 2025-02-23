import { Router, Request, Response } from "express"

// Services
import { getPatients, addPatient, getPatientsFull, addNewEntry } from "../services/patientorsServices"
import { newEntry } from "../types"

// MiddleWares
import { verifyParams } from "../middleware/middlewares"

const patientsRouter = Router()

patientsRouter.get("/", (_req, res) => {
	const patients = getPatients()
	res.send(patients)
})

patientsRouter.get("/:id", (req, res) => {
	const id = req.params.id
	const patients = getPatientsFull()
	const patient = patients.filter((patient) => patient.id === id)
	res.status(200).send(patient[0])
})

patientsRouter.post("/", verifyParams, (req: Request, res: Response) => {
	addPatient(req.body as newEntry)
	res.json(req.body)
})

patientsRouter.post("/:id/entries", (req, res) => {
	const id = req.params.id
	const entry = req.body

	try {
		if (!addNewEntry(id, entry)) {
			throw new Error("Patient not localized")
		}
		res.sendStatus(201)
	} catch (err) {
		if (err instanceof Error) {
			res.status(500).send({ error: err.message }).end()
		}
	}
})

export default patientsRouter
