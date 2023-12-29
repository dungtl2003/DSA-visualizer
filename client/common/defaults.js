/**
 * Run at the beginning
 */
"use strict";

import "../asset/css/base.css";
import "../asset/css/main.css";
import "../asset/css/support.css";
import "../asset/css/reponsive.css";
import image from "../asset/img/logo.png";
const sliderDefaultValue = 5;
const sliderMaxCols = 25;
const sliderMinCols = 5;
const maxSpeed = 100;
const minSpeed = 20000;

const colsNumberDisplay = document.getElementById("body__sidebar__col-num");
const slider = document.getElementById("body__sidebar__slider");
const iconContainer = document.getElementById(
    "header__navbar__left-section__logo-container"
);

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
    const icon = document.createElement("img");
    icon.setAttribute("src", image);
    icon.setAttribute("class", "header__navbar__left-section__logo");
    icon.setAttribute("alt", "logo.img");
    iconContainer.appendChild(icon);
};

export {sliderDefaultValue, sliderMinCols, sliderMaxCols, minSpeed, maxSpeed};
