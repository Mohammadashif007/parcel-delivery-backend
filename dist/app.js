"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./app/routes");
const globalErrorHandler_1 = require("./app/middlewares/globalErrorHandler");
const notfound_1 = require("./app/middlewares/notfound");
const app = (0, express_1.default)();
// ! middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// ! application api
app.use("/api/v1", routes_1.router);
// ! test api
app.get("/", (req, res) => {
    res.status(200).json({
        message: "welcome to fair haven",
    });
});
// ! global error handler
app.use(globalErrorHandler_1.globalErrorHandler);
// ! API not found
app.use(notfound_1.notFound);
exports.default = app;
