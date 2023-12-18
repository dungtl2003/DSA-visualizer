"use strict";

import express from "express";

const router = express.Router();

router.use((req, res, next) => {
    console.log(`Time: ${new Date().toJSON()}`);
    next();
});

router.get("/", (req, res) => {
    res.send("Main sorting page");
});

router.get("/about", (req, res) => {
    res.send("Sorting is very important");
});

export default router;
