"use strict";

const columnContainer = document.getElementById(
    "body__main-content__display__frame"
);
const colNumberDisplay = document.getElementById("body__sidebar__col-num");
const slider = document.getElementById("body__sidebar__slider");
const column = document.getElementsByClassName(
    "body__main-content__display__col"
);
const animateDuration = 1500;

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
 * Draw a list of HTML column elements, each with random height
 * @param {Number} columns  Number of columns you want to generate
 * @param {Number} start    The minimum height of the column
 * @param {Number} end      The maximum height of the column
 * @returns {void}
 */
const drawColumn = function (columns, start = 10, end = 100) {
    const elements = new Array(columns)
        .fill(0)
        .map(() =>
            createColumn(start + Math.floor(Math.random() * (end - start)))
        );

    columnContainer.replaceChildren();
    elements.forEach((e) => columnContainer.appendChild(e));

    $(function () {
        $(".body__main-content__display__col").each(function () {
            $(this).animate(
                {
                    height: $(this).data("percentage") + "%",
                },
                animateDuration
            );
        });
    });
};

/**
 * Comming soon
 * @returns {void}
 */
const generateColumns = function () {
    colNumberDisplay.innerHTML = slider.value;
    drawColumn(Number(slider.value));
};

export { drawColumn, generateColumns };
