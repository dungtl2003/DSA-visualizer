"use strict";

import "./common/setDefault.js";
import {drawColumns, shuffleColumsHeight} from "./common/array.js";
import mergesort from "./components/sort/mergesort.js";
import mergesortAmination from "./amination/sort/mergesort.js";
import {getValidColNumber} from "./common/utils.js";

const slider = document.getElementById("body__sidebar__slider");
const colNumberDisplay = document.getElementById("body__sidebar__col-num");
const columnContainer = document.getElementById(
    "body__main-content__display__frame"
);

const btnSolve = document.getElementById("body__sidebar__btn-item--solve");
const btnShuffle = document.getElementById("body__sidebar__btn-item--shuffle");
const sidebarForm = document.getElementById("body__sidebar__form");
const colNumForm = document.getElementById(
    "body__sidebar__param-display__form"
);
let curColNumber = sliderDefaultValue;
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

slider.oninput = function () {
    curColNumber = Number(this.value);
    colNumberDisplay.value = this.value;
};

slider.onchange = function () {
    drawColumns(curColNumber);
    addColMouseEvent();
};

btnSolve.addEventListener("click", function (e) {
    const values = [];
    for (const child of columnContainer.children) {
        values.push(
            Number(child.childNodes[0].getAttribute("data-percentage"))
        );
    }

    const instructions = mergesort(values);
    mergesortAmination(instructions);
});

btnShuffle.addEventListener("click", function (e) {
    if (curColNumber !== 0) shuffleColumsHeight(curColNumber);
});

colNumForm.addEventListener("submit", (event) => {
    event.preventDefault();
});

sidebarForm.addEventListener("submit", (event) => {
    event.preventDefault();
});

colNumberDisplay.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {
        curColNumber = getValidColNumber();
        colNumberDisplay.value = curColNumber.toString();
        slider.value = curColNumber.toString();
        drawColumns(curColNumber);
        addColMouseEvent();
    }
});

const addColMouseEvent = function () {
    document
        .querySelectorAll(".body__main-content__display__col")
        .forEach((e) => {
            e.addEventListener("mouseover", function (event) {
                const valueElement = document.createElement("div");
                valueElement.setAttribute(
                    "id",
                    "body__main-content__display__value"
                );
                valueElement.innerHTML = e.getAttribute("data-percentage");
                e.parentNode.appendChild(valueElement);
            });
            e.addEventListener("mouseout", function (event) {
                const valueElement = document.getElementById(
                    "body__main-content__display__value"
                );
                e.parentNode.removeChild(valueElement);
            });
        });
};

addColMouseEvent();
