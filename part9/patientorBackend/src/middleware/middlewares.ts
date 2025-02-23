import { z } from "zod"
import { Request, Response, NextFunction } from "express"
import { newEntryBody } from "../services/patientorsServices"

export const errorHandler = (error: unknown, _req: Request, res: Response, _next: NextFunction) => {
	if (error instanceof z.ZodError) {
		res.status(400).send({ error: error.issues })
	} else if (error instanceof Error) {
		res.status(400).send({ error: error.message })
	}
}

export const verifyParams = (req: Request, _res: Response, next: NextFunction) => {
	try {
		newEntryBody(req.body)
		next()
	} catch (error: unknown) {
		next(error)
	}
}
