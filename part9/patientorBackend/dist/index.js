"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
let app = (0, express_1.default)();
// Routes
const diagnosticRouter_1 = __importDefault(require("./routes/diagnosticRouter"));
const patientsRouter_1 = __importDefault(require("./routes/patientsRouter"));
// Middleware
const middlewares_1 = require("./middleware/middlewares");
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/diagnostics", diagnosticRouter_1.default);
app.use("/api/patients", patientsRouter_1.default);
app.use(middlewares_1.errorHandler);
app.listen(3001, function () {
    console.log("Server is running on port 3001");
});
