"use strict";

import {sliderMinColsNumber, sliderMaxColsNumber} from "./setDefault.js";

const colNumberDisplay = document.getElementById("body__sidebar__col-num");

/**
 * Return valid number of columns
 * @returns {Number}               The valid number of columns
 */
const getValidColNumber = function () {
    const value = Number(colNumberDisplay.value);
    return value > sliderMaxColsNumber
        ? sliderMaxColsNumber
        : value < sliderMinColsNumber
          ? sliderMinColsNumber
          : value;
};

export {getValidColNumber};
