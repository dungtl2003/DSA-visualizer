"use strict";

import logger from "../config/logger.js";
import express from "express";
import sort from "./route/sorting.js";

const app = express();
const port = 3000;

app.all("/", (req, res, next) => {
    // logger.debug(`Request: ${Object.entries(req)}`);
    // logger.debug(`Respone: ${Object.entries(res)}`);
    next();
});

app.get("/", (req, res) => {
    res.send("Hello world!");
});

app.use("/sort", sort);

app.listen(port, () => {
    logger.info(`App is listening on port ${port}`);
});
