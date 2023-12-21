"use strict";

import "./common/setDefault.js";
import {drawColumns} from "./common/utils/array.js";
import mergesort from "./components/sort/mergesort.js";
import runSortingAnimation from "./amination/sort/mergesort.js";

const slider = document.getElementById("body__sidebar__slider");
const colNumberDisplay = document.getElementById("body__sidebar__col-num");
const columnContainer = document.getElementById(
    "body__main-content__display__frame"
);
const btn = document.getElementById("body__sidebar__btn-item--solve");

slider.onchange = function () {
    colNumberDisplay.innerHTML = this.value;
    drawColumns(Number(this.value));
};

btn.addEventListener("click", function (e) {
    const values = [];
    const children = columnContainer.children;
    for (const child of children) {
        values.push(Number(child.getAttribute("data-percentage")));
    }
    const instructions = mergesort(values);
    runSortingAnimation(instructions);
});
