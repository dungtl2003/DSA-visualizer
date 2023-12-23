"use strict";

import {format, createLogger, transports} from "winston";
const {combine, timestamp, label, printf} = format;

const ENVIRONMENT = process.env.NODE_ENV;
const LEVEL = process.env.LOGGING_LEVEL;

const myFormat = printf(({level, message, label, timestamp}) => {
    return `${timestamp} [${label}] ${level.toUpperCase()}: ${message}`;
});

const logger = createLogger({
    level: LEVEL,
    format: combine(label({label: ENVIRONMENT}), timestamp(), myFormat),
    transports: [
        //
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `combined.log`
        //
        new transports.File({filename: "error.log", level: "error"}),
        new transports.File({filename: "combined.log"}),
    ],
});

//
// If we're not in production then log to the `console` with the format
//
if (ENVIRONMENT !== "production") {
    logger.add(new transports.Console({}));
}

export default logger;
