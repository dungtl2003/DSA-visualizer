"use strict";

import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const __domPath = [__dirname, "..", "..", "test-fe", "dom-interaction"].join(
    "/"
);
const __arrayElementPath = [
    __dirname,
    "..",
    "..",
    "test-fe",
    "create-list-elements",
].join("/");

const router = express.Router();

// serve static files
router.use("/dom", express.static(__domPath));
router.use("/le", express.static(__arrayElementPath));

// middleware
router.all("/", (req, res, next) => {
    console.log(`Time: ${new Date().toJSON()}`);
    console.log(`Request: ${req.toString()}`);
    console.log(`Request: ${res.toString()}`);
    next();
});

//endpoints
router.get("/", (req, res) => {
    res.send(`main test page`);
});

router.get("/dom", (req, res) => {
    res.sendFile("index.html", { root: __domPath });
});

router.get("/le", (req, res) => {
    res.sendFile("index.html", { root: __arrayElementPath });
});

export default router;
