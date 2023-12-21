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
const btnSolve = document.getElementsByClassName(
    "body__sidebar__btn-item--solve"
)[0];

window.onpageshow = function (event) {
    if (event.persisted) {
        // reload each time go out of the current page
        window.location.reload();
    }
};

// Slider to change the number of columns
slider.onchange = function () {
    colNumberDisplay.innerHTML = this.value;
    drawColumns(Number(this.value));
};

// Button to solve the column list
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
