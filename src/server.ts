/* eslint-disable no-console */
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";

let server: Server;

const startServer = async () => {
    try {
        await mongoose.connect(envVars.DB_URL);
        console.log("Database connected");
        server = app.listen(envVars.PORT, () => {
            console.log(`Server is listening at port ${envVars.PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};

startServer();

// ! Unhandled Rejection error
process.on("unhandledRejection", (err) => {
    console.log(
        "Unhandled Rejection occurred...server shutting down automatically",
        err
    );
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});

// ! Uncaught Exception error
process.on("uncaughtException", (err) => {
    console.log(
        "Uncaught exception occurred... Server shutting down automatically",
        err
    );
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});

// ! Signal termination SIGTERM
process.on("SIGTERM", () => {
    console.log(
        "Signal termination detected... Server shutting down automatically"
    );
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});

process.on("SIGINT", () => {
    console.log("SIGINT signal detected... Server shutting down automatically");
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
