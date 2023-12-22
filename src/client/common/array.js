"use strict";

const columnContainer = document.getElementById(
    "body__main-content__display__frame"
);
const animateDuration = 1000;

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
 * @returns {void}
 */
const draw = function (column, duration) {
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
 * @returns {void}
 */
const drawColumns = function (columns, start = 10, end = 100) {
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
                animateDuration
            );
        });
    });
};

/**
 * Redraw a list of HTML column elements, each with random height
 * @param {Number} columns  Number of columns you want to generate
 * @param {Number} start    The minimum height of the column
 * @param {Number} end      The maximum height of the column
 * @returns {void}
 */
const shuffleColumsHeight = function (columns, start = 10, end = 100) {
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
        draw(e.childNodes[0], animateDuration);
    }
};

export {draw, drawColumns, shuffleColumsHeight};
