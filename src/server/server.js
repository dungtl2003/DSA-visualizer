"use strict";

import express from "express";
import sort from "./route/sorting.js";
import test from "./route/test.js";

const app = express();
const port = 3000;

app.all("/", (req, res, next) => {
    console.log(`Time: ${new Date().toJSON()}`);
    console.log(`Request: ${req}`);
    console.log(`Respone: ${res}`);
    next();
});

app.get("/", (req, res) => {
    res.send("Main page");
});

app.use("/sort", sort);
app.use("/test", test);

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
