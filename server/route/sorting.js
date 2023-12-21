"use strict";

import express from "express";
import path from "path";

const HOME_PATH = process.env.NODE_ROOT;
const router = express.Router();

router.use(express.static(path.join(HOME_PATH, "dist", "sort")));

router.get("/", (req, res) => {
    res.sendFile("index.html", {root: path.join(HOME_PATH, "dist", "sort")});
});

router.get("/about", (req, res) => {
    res.send("Sorting is very important");
});

export default router;
