"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// Services
const patientorsServices_1 = require("../services/patientorsServices");
// MiddleWares
const middlewares_1 = require("../middleware/middlewares");
const patientsRouter = (0, express_1.Router)();
patientsRouter.get("/", (_req, res) => {
    const patients = (0, patientorsServices_1.getPatients)();
    res.send(patients);
});
patientsRouter.get("/:id", (req, res) => {
    const id = req.params.id;
    const patients = (0, patientorsServices_1.getPatientsFull)();
    const patient = patients.filter((patient) => patient.id === id);
    res.status(200).send(patient[0]);
});
patientsRouter.post("/", middlewares_1.verifyParams, (req, res) => {
    (0, patientorsServices_1.addPatient)(req.body);
    res.json(req.body);
});
patientsRouter.post("/:id/entries", (req, res) => {
    const id = req.params.id;
    const entry = req.body;
    try {
        if (!(0, patientorsServices_1.addNewEntry)(id, entry)) {
            throw new Error("Patient not localized");
        }
        res.sendStatus(201);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).send({ error: err.message }).end();
        }
    }
});
exports.default = patientsRouter;
