"use strict";

import "./common/setDefault.js";
import { drawColumns } from "./common/utils/array.js";

const slider = document.getElementById("body__sidebar__slider");
const colNumberDisplay = document.getElementById("body__sidebar__col-num");

slider.onchange = function () {
    colNumberDisplay.innerHTML = this.value;
    drawColumns(Number(this.value));
};
