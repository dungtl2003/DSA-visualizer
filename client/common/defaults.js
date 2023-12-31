/**
 * Run at the beginning
 */
"use strict";

const defaultCols = 5;
const maxCols = 25;
const minCols = 5;
const defaultSpeed = 1;
const maxSpeed = 2;
const minSpeed = 0.25;
const speedStep = 0.25;

const colsNumberDisplay = document.getElementById("body__sidebar__col-num");
const speedNumberDisplay = document.getElementById(
    "body__sidebar__animate-speed"
);
const colNumberSlider = document.getElementById("body__sidebar__slider");
const speedSlider = document.getElementById("body__sidebar__slider--speed");

const getComponents = async function () {
    const {drawColumns} = await import("./column.js");
    const {setSpeed} = await import("../animations/sort/mergesort.js");

    return {drawColumns, setSpeed};
};

getComponents()
    .then((values) => {
        init(values);
    })
    .catch(() => "Error");

const init = function (values) {
    let drawColumns;
    let setSpeed;
    ({drawColumns, setSpeed} = values);

    colsNumberDisplay.innerHTML = defaultCols;
    colNumberSlider.setAttribute("value", defaultCols);
    colNumberSlider.setAttribute("min", minCols);
    colNumberSlider.setAttribute("max", maxCols);
    drawColumns(defaultCols);

    colsNumberDisplay.setAttribute("min", minCols);
    colsNumberDisplay.setAttribute("max", maxCols);
    colsNumberDisplay.setAttribute("value", defaultCols);

    speedSlider.setAttribute("min", minSpeed);
    speedSlider.setAttribute("max", maxSpeed);
    speedSlider.setAttribute("step", speedStep);
    speedSlider.setAttribute("value", defaultSpeed);
    setSpeed(1 / defaultSpeed);

    speedNumberDisplay.setAttribute("value", defaultSpeed);
};

export {
    defaultCols as sliderDefaultValue,
    minCols as sliderMinCols,
    maxCols as sliderMaxCols,
    defaultSpeed,
    minSpeed,
    maxSpeed,
};
