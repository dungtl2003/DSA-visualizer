/**
 * This module will have all things needed to modify column elements in a list
 */
"use strict";

let columnContainer = document.getElementById(
    "body__main-content__display__frame"
);
const defaultDuration = 1000;

/**
 * Create column HTML element
 * @param   {Number} dataPercentage     Determine the height of the column
 * @returns {HTMLLIElement}               The LIHTML column element
 */
const createColumn = function (dataPercentage) {
    const columnElement = document.createElement("li");

    const properties = document.createElement("div");
    properties.setAttribute("class", "body__main-content__display__col");
    properties.setAttribute("data-percentage", dataPercentage.toString());

    columnElement.appendChild(properties);

    return columnElement;
};

/**
 * Draw the column element
 * @param   {HTMLLIElement} column The column element
 * @param {Number} duration The duration of drawing a Column
 * @returns {void}
 */
const drawColumn = function (column, duration) {
    $(column).animate(
        {
            height: column.getAttribute("data-percentage") + "%",
        },
        duration
    );
};

/**
 * Draw a list of HTML column elements, each with random height
 * @param {Number} columns  Number of columns you want to generate
 * @param {Number} start    The minimum height of the column
 * @param {Number} end      The maximum height of the column
 * @param {Number} duration The duration of drawing each Column
 * @returns {void}
 */
const drawColumns = async function (
    columns,
    start = 10,
    end = 100,
    duration = defaultDuration
) {
    //create
    const elements = new Array(columns)
        .fill(0)
        .map(() =>
            createColumn(start + Math.floor(Math.random() * (end - start)))
        );

    columnContainer.replaceChildren();
    elements.forEach((e) => columnContainer.appendChild(e));

    //draw
    $(function () {
        $(".body__main-content__display__col").each(function () {
            $(this).animate(
                {
                    height: $(this).data("percentage") + "%",
                },
                duration
            );
        });
    });

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, duration);
    });
};

/**
 * Redraw a list of HTML column elements, each with random height
 * @param {Number} columns  Number of columns you want to generate
 * @param {Number} start    The minimum height of the column
 * @param {Number} end      The maximum height of the column
 * @param {Number} duration The duration of shuffle column
 * @returns {void}
 */
const shuffleColumns = async function (
    columns,
    start = 10,
    end = 100,
    duration = defaultDuration
) {
    //generate random height
    const values = new Array(columns)
        .fill(0)
        .map((x) => x + start + Math.floor(Math.random() * (end - start)));

    //set percentage
    let i = 0;
    const columnsList = columnContainer.children;
    for (let e of columnsList) {
        e.childNodes[0].setAttribute("data-percentage", values[i++].toString());

        //draw
        drawColumn(e.childNodes[0], duration);
    }

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, duration);
    });
};

export {drawColumn, drawColumns, shuffleColumns};
