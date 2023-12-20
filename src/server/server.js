"use strict";

import express from "express";
import sort from "./route/sorting.js";

const app = express();
const port = 3000;

app.all("/", (req, res, next) => {
    console.log("Get here first");
    next();
});

app.get("/", (req, res) => {
    res.send("Hello world!");
});

app.use("/sort", sort);

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
