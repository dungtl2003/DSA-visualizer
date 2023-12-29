/**
 * Run at the beginning
 */
"use strict";

import "../asset/css/base.css";
import "../asset/css/main.css";
import "../asset/css/support.css";
import "../asset/css/reponsive.css";
import image from "../asset/img/logo.png";
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
const iconContainer = document.getElementById(
    "header__navbar__left-section__logo-container"
);

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

    colsNumberDisplay.setAttribute("min", minCols);
    colsNumberDisplay.setAttribute("max", maxCols);
    colsNumberDisplay.setAttribute("value", defaultCols);

    speedSlider.setAttribute("min", minSpeed);
    speedSlider.setAttribute("max", maxSpeed);
    speedNumberDisplay.setAttribute("value", defaultSpeed);
    speedSlider.setAttribute("step", speedStep);
    setSpeed(1 / defaultSpeed);

    drawColumns(defaultCols);
    const icon = document.createElement("img");
    icon.setAttribute("src", image);
    icon.setAttribute("class", "header__navbar__left-section__logo");
    icon.setAttribute("alt", "logo.img");
    iconContainer.appendChild(icon);
};

export {
    defaultCols as sliderDefaultValue,
    minCols as sliderMinCols,
    maxCols as sliderMaxCols,
    defaultSpeed,
    minSpeed,
    maxSpeed,
};
