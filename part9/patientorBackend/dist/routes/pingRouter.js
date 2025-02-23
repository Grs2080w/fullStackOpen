"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pingRouter = (0, express_1.Router)();
pingRouter.get("/", (_req, res) => {
    res.send("pong");
});
exports.default = pingRouter;
