"use strict";

import "./common/setDefault.js";
import {drawColumns} from "./common/utils/array.js";
import mergesort from "./components/sort/mergesort.js";
import mergesortAmination from "./amination/sort/mergesort.js";

const slider = document.getElementById("body__sidebar__slider");
const colNumberDisplay = document.getElementById("body__sidebar__col-num");
const columnContainer = document.getElementById(
    "body__main-content__display__frame"
);

const btnSolve = document.getElementById("body__sidebar__btn-item--solve");
const shuffleBtn = document.getElementById("body__sidebar__btn-item--shuffle");

let curColNumber = sliderDefaultValue;

slider.onchange = function () {
    colNumberDisplay.innerHTML = this.value;
    curColNumber = Number(this.value);
    drawColumns(curColNumber);
};

btnSolve.addEventListener("click", function () {
    const values = [];
    for (const child of columnContainer.children) {
        values.push(
            Number(child.childNodes[0].getAttribute("data-percentage"))
        );
    }

    const instructions = mergesort(values);
    mergesortAmination(instructions);
});

shuffleBtn.addEventListener("click", function (e) {
    if (curColNumber !== 0) drawColumns(curColNumber);
});
