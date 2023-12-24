"use strict";

const duration = 1500;
const columnContainer = document.getElementById(
    "body__main-content__display__frame"
);

const getComponents = async function () {
    const {drawColumn} = await import("../../common/column.js");
    return {drawColumn};
};

let drawColumn;
let signal = null;
getComponents()
    .then((values) => {
        ({drawColumn} = values);
    })
    .catch();

/**
 * Change color of the column to `color` for `duration` time
 * @param   {HTMLLIElement} column      The column element
 * @param   {String}        color       Color to paint the column
 * @returns {void}
 */
const flashColumnColor = function (column, color) {
    changeColumnColor(column, color);

    const timeoutId = setTimeout(() => {
        changeColumnColor(column, color);
    }, duration / 2);

    signal.addEventListener("abort", () => {
        clearTimeout(timeoutId);
        if (
            column.classList.contains(
                "body__main-content__display__col--turn-" + color
            )
        ) {
            changeColumnColor(column, color);
        }
    });
};

/**
 * Change the color of the column
 * @param   {HTMLLIElement} column      The column element
 * @param   {String}        color       Color to paint the column
 * @returns {void}
 */
const changeColumnColor = function (column, color) {
    column.classList.toggle("body__main-content__display__col--turn-" + color);
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
        flashColumnColor(columns[instruction.p1].childNodes[0], color);
    }
    if (instruction.p2 !== -1) {
        flashColumnColor(columns[instruction.p2].childNodes[0], color);
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
        flashColumnColor(columns[i].childNodes[0], color1);
    }

    for (let i = mid + 1; i <= end; i++) {
        flashColumnColor(columns[i].childNodes[0], color2);
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
        drawColumn(columns[i].childNodes[0], duration);
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

        const timeoutId = setTimeout(() => {
            resolve();
        }, duration);

        signal.addEventListener("abort", () => {
            clearTimeout(timeoutId);
        });
    });
};

/**
 * Run animation of all `instructions`
 * @param   {Array<Object>}     instructions    All instructions to follow
 * @param   {AbortSignal}       abortSignal     Signal to know if this operation should be canceled
 * @returns {void}
 */
const animation = async function (instructions, abortSignal) {
    if (!drawColumn) return;
    signal = abortSignal;

    for (const instruction of instructions) {
        await handle(instruction);
    }
};

export default animation;
