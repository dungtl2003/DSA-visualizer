"use strict";

import "./common/default.js";
import { drawColumn, generateColumns } from "./common/utils.js";

const slider = document.getElementById("body__sidebar__slider");

slider.onchange = function () {
    generateColumns();
};
