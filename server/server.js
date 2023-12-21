"use strict";

import logger from "../config/logger.js";
import express from "express";
import sort from "./route/sorting.js";

const PORT = process.env.PORT;

const app = express();

app.get("/", (req, res) => {
    res.send("Hello world");
});

app.use("/sort", sort);

app.listen(PORT, () => {
    logger.info(`App is listening on port ${PORT}`);
});
