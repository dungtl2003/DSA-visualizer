"use strict";

import path from "path";
import logger from "../config/logger.js";
import express from "express";

const HOME_PATH = process.env.NODE_ROOT;
const PORT = process.env.PORT;

const app = express();

// serve static files
app.use("/", express.static(path.join(HOME_PATH, "dist")));

// serve main page
app.get("/", (req, res) => {
    res.sendFile("index.html", {root: path.join(HOME_PATH, "dist")});
});

// expose port
app.listen(PORT, () => {
    logger.info(`App is listening on port ${PORT}`);
});
