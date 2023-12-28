"use strict";

import {sliderMinCols, sliderMaxCols, maxSpeed, minSpeed} from "./defaults.js";

const colNumberInput = document.getElementById("body__sidebar__col-num");
const speedInput = document.getElementById("body__sidebar__animate-speed");
/**
 * Return valid number of columns
 * @returns {Number}               The valid number of columns
 */
const getValidColNumber = function () {
    const value = Number(colNumberInput.value);
    return value > sliderMaxCols
        ? sliderMaxCols
        : value < sliderMinCols
          ? sliderMinCols
          : value;
};

const getValidSpeed = function () {
    const value = Number(speedInput.value);
    return value < maxSpeed ? maxSpeed : value > minSpeed ? minSpeed : value;
};

export {getValidColNumber, getValidSpeed};
