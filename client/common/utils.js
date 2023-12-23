"use strict";

import {sliderMinCols, sliderMaxCols} from "./defaults.js";

const colNumberDisplay = document.getElementById("body__sidebar__col-num");

/**
 * Return valid number of columns
 * @returns {Number}               The valid number of columns
 */
const getValidColNumber = function () {
    const value = Number(colNumberDisplay.value);
    return value > sliderMaxCols
        ? sliderMaxCols
        : value < sliderMinCols
          ? sliderMinCols
          : value;
};

export {getValidColNumber};
