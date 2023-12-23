"use strict";

import {draw} from "../../common/array.js";

const duration = 1000;
const columnContainer = document.getElementById(
    "body__main-content__display__frame"
);

/**
 * Change color of the column to `color` for `duration` time
 * @param   {HTMLLIElement} column  The column element
 * @param   {String}        color   Color to paint the column
 * @returns {void}
 */
const paint = function (column, columnBgColor, time) {
    switchColumnColor(columnBgColor, column);

    setTimeout(() => {
        switchColumnColor(columnBgColor, column);
    }, duration);
};

const switchColumnColor = function (color, column) {
    switch (color) {
        case "red":
            column.classList.toggle(
                "body__main-content__display__col--turn-red"
            );
            break;
        case "blue":
            column.classList.toggle(
                "body__main-content__display__col--turn-blue"
            );
            break;
        case "yellow":
            column.classList.toggle(
                "body__main-content__display__col--turn-yellow"
            );
            break;
    }
};

/**
 * Handle the compare amination
 * @param   {Object}                  instruction   The instruction to animate
 * @param   {Array<HTMLLIElement>}    columns       List of column elements
 * @param   {String}                  color         Color to paint both the columns
 * @returns {void}
 */
const compare = function (instruction, columns, color = "red") {
    if (instruction.p1 !== -1) {
        paint(columns[instruction.p1].childNodes[0], color, duration);
    }
    if (instruction.p2 !== -1) {
        paint(columns[instruction.p2].childNodes[0], color, duration);
    }
};

/**
 * Handle the divide amination
 * @param   {Object}                  instruction   The instruction to animate
 * @param   {Array<HTMLLIElement>}    columns       List of column elements
 * @param   {String}                  color1        Color to paint columns in the first sub-array
 * @param   {String}                  color2        Color to paint columns in the second sub-array
 * @returns {void}
 */
const divide = function (
    instruction,
    columns,
    color1 = "yellow",
    color2 = "blue"
) {
    const start = instruction.start;
    const mid = instruction.mid;
    const end = instruction.end;

    for (let i = start; i <= mid; i++) {
        paint(columns[i].childNodes[0], color1);
    }

    for (let i = mid + 1; i <= end; i++) {
        paint(columns[i].childNodes[0], color2);
    }
};

/**
 * Handle the merge amination
 * @param   {Object}                  instruction   The instruction to animate
 * @param   {Array<HTMLLIElement>}    columns       List of column elements
 * @returns {void}
 */
const merge = function (instruction, columns) {
    let dataIndex = 0;
    const values = instruction.values;
    const start = instruction.start;
    const end = start + values.length - 1;

    for (let i = start; i <= end; i++) {
        columns[i].childNodes[0].setAttribute(
            "data-percentage",
            values[dataIndex++]
        );
        draw(columns[i].childNodes[0], duration);
    }
};

/**
 * Handle animation following the `instruction`
 * @param   {Object}        instruction   The instruction to animate
 * @returns {Promise}
 */
const handle = async function (instruction) {
    let columns = columnContainer.children;

    return new Promise((resolve) => {
        switch (instruction.type) {
            case "divide":
                divide(instruction, columns);
                break;
            case "compare":
                compare(instruction, columns);
                break;
            case "merge":
                merge(instruction, columns);
                break;
        }

        setTimeout(() => {
            resolve();
        }, duration);
    });
};

/**
 * Run animation of all `instructions`
 * @param   {Array<Object>}     instructions   All instructions to follow
 * @returns {void}
 */
const animation = async function (instructions) {
    for (const instruction of instructions) {
        await handle(instruction);
    }
};

export default animation;
