"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyParams = exports.errorHandler = void 0;
const zod_1 = require("zod");
const patientorsServices_1 = require("../services/patientorsServices");
const errorHandler = (error, _req, res, _next) => {
    if (error instanceof zod_1.z.ZodError) {
        res.status(400).send({ error: error.issues });
    }
    else if (error instanceof Error) {
        res.status(400).send({ error: error.message });
    }
};
exports.errorHandler = errorHandler;
const verifyParams = (req, _res, next) => {
    try {
        (0, patientorsServices_1.newEntryBody)(req.body);
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.verifyParams = verifyParams;
