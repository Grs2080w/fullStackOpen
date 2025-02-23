"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNewEntry = exports.addPatient = exports.newEntryBody = exports.getPatientsFull = exports.getPatients = exports.getDiagnostics = void 0;
const zod_1 = require("zod");
const uuid_1 = require("uuid");
// Services
const types_1 = require("../types");
// Datas
const patients_1 = __importDefault(require("../datas/patients"));
const diagnostics_1 = __importDefault(require("../datas/diagnostics"));
const getDiagnostics = () => {
    return diagnostics_1.default;
};
exports.getDiagnostics = getDiagnostics;
const getPatients = () => {
    return patients_1.default.map((patient) => {
        return {
            id: patient.id,
            name: patient.name,
            dateOfBirth: patient.dateOfBirth,
            gender: patient.gender,
            occupation: patient.occupation,
        };
    });
};
exports.getPatients = getPatients;
const getPatientsFull = () => {
    return patients_1.default.map((patient) => {
        return {
            id: patient.id,
            name: patient.name,
            dateOfBirth: patient.dateOfBirth,
            ssn: patient.ssn,
            gender: patient.gender,
            occupation: patient.occupation,
            entries: patient.entries,
        };
    });
};
exports.getPatientsFull = getPatientsFull;
const newEntryBody = (params) => {
    const newPatient = zod_1.z.object({
        name: zod_1.z.string().nonempty("name is required"),
        dateOfBirth: zod_1.z
            .string()
            .date()
            .min(1)
            .regex(/^\d{4}-\d{2}-\d{2}$/),
        ssn: zod_1.z.string(),
        gender: zod_1.z.nativeEnum(types_1.Gender),
        occupation: zod_1.z.string(),
    });
    return newPatient.parse(params);
};
exports.newEntryBody = newEntryBody;
const addPatient = ({ name, dateOfBirth, ssn, gender, occupation }) => {
    const newPatient = {
        name,
        dateOfBirth,
        ssn,
        gender,
        occupation,
        id: (0, uuid_1.v4)(),
    };
    patients_1.default.push(newPatient);
};
exports.addPatient = addPatient;
const parseDiagnosisCodes = (object) => {
    if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
        return [];
    }
    return object.diagnosisCodes;
};
const parseObject = (entry) => {
    if (entry.type === "Hospital" || entry.type === "HealthCheck" || entry.type === "OccupationalHealthcare" || !parseDiagnosisCodes(entry)) {
        return true;
    }
    else {
        return false;
    }
};
const addNewEntry = (id, entry) => {
    const patient = patients_1.default.filter((pat) => pat.id === id)[0];
    if (!patient) {
        return null;
    }
    if (parseObject(entry)) {
        const newEntry = Object.assign(Object.assign({}, entry), { id: (0, uuid_1.v4)() });
        const newEntryJson = JSON.stringify(newEntry);
        console.log(`--> New Entry Added to patient ${id} with object ${newEntryJson}`);
        patients_1.default.map((patient) => {
            var _a;
            if (patient.id === id) {
                (_a = patient.entries) === null || _a === void 0 ? void 0 : _a.push(newEntry);
            }
        });
    }
    return patients_1.default;
};
exports.addNewEntry = addNewEntry;
