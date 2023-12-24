/**
 * Run at the beginning
 */
"use strict";

import "../asset/font/fontawesome-free-6.4.2-web/css/all.min.css";
import "../asset/css/base.css";
import "../asset/css/main.css";
import "../asset/css/support.css";

const sliderDefaultValue = 5;
const sliderMaxCols = 150;
const sliderMinCols = 5;

const colsNumberDisplay = document.getElementById("body__sidebar__col-num");
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

    colsNumberDisplay.innerHTML = sliderDefaultValue;
    slider.setAttribute("value", sliderDefaultValue);
    slider.setAttribute("min", sliderMinCols);
    slider.setAttribute("max", sliderMaxCols);

    colsNumberDisplay.setAttribute("min", sliderMinCols);
    colsNumberDisplay.setAttribute("max", sliderMaxCols);
    colsNumberDisplay.setAttribute("value", sliderDefaultValue);

    drawColumns(sliderDefaultValue);
};

export {sliderDefaultValue, sliderMinCols, sliderMaxCols};
