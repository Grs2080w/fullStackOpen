"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const patientorsServices_1 = require("../services/patientorsServices");
const diagnosticRouter = (0, express_1.Router)();
diagnosticRouter.get("/", (_req, res) => {
    const diagnostics = (0, patientorsServices_1.getDiagnostics)();
    res.send(diagnostics);
});
exports.default = diagnosticRouter;
