/**
 * Run at the beginning
 */
"use strict";

import "../asset/font/fontawesome-free-6.4.2-web/css/all.min.css";
import "../asset/css/base.css";
import "../asset/css/main.css";
import "../asset/css/support.css";
import "../asset/css/reponsive.css";
const sliderDefaultValue = 5;
const sliderMaxCols = 25;
const sliderMinCols = 5;
const defaultSpeed = 1;
const maxSpeed = 0.25;
const minSpeed = 2;

const colsNumberDisplay = document.getElementById("body__sidebar__col-num");
const speedNumberDisplay = document.getElementById(
    "body__sidebar__animate-speed"
);
const slider = document.getElementById("body__sidebar__slider");

const getComponents = async function () {
    const {drawColumns} = await import("./column.js");
    return {drawColumns};
};

getComponents()
    .then((values) => {
        init(values);
    })
    .catch(() => "Error");

const init = function (values) {
    let drawColumns;
    ({drawColumns} = values);

    speedNumberDisplay.innerHTML = defaultSpeed;

    colsNumberDisplay.innerHTML = sliderDefaultValue;
    slider.setAttribute("value", sliderDefaultValue);
    slider.setAttribute("min", sliderMinCols);
    slider.setAttribute("max", sliderMaxCols);

    colsNumberDisplay.setAttribute("min", sliderMinCols);
    colsNumberDisplay.setAttribute("max", sliderMaxCols);
    colsNumberDisplay.setAttribute("value", sliderDefaultValue);

    drawColumns(sliderDefaultValue);
};

export {
    sliderDefaultValue,
    sliderMinCols,
    sliderMaxCols,
    defaultSpeed,
    minSpeed,
    maxSpeed,
};
