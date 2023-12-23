"use strict";

import "./common/setDefault.js";
import {drawColumns, shuffleColumsHeight} from "./common/array.js";
import mergesort from "./components/sort/mergesort.js";
import mergesortAmination from "./amination/sort/mergesort.js";
import {sliderDefaultValue} from "./common/setDefault.js";
import {getValidColNumber} from "./common/utils.js";

const slider = document.getElementById("body__sidebar__slider");
const colNumberDisplay = document.getElementById("body__sidebar__col-num");
const columnContainer = document.getElementById(
    "body__main-content__display__frame"
);
const colNumForm = document.getElementById(
    "body__sidebar__param-display__form"
);
const btnSolve = document.getElementById("body__sidebar__btn-item--solve");
const shuffleBtn = document.getElementById("body__sidebar__btn-item--shuffle");
const sidebarForm = document.getElementById("body__sidebar__form");
const scrollRightBtn = document.getElementById(
    "body__main-content__scroll-btn--right"
);
const scrollLeftBtn = document.getElementById(
    "body__main-content__scroll-btn--left"
);
const selectionContainer = document.getElementById("type-selection");

let curColNumber = sliderDefaultValue;

// Event: Slider for columns number changing
slider.oninput = function () {
    curColNumber = Number(this.value);
    colNumberDisplay.value = this.value;
};

slider.onchange = function () {
    drawColumns(curColNumber);
    addColMouseEvent();
};

// Event: Solve problem button
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

// Event:Shuffle button
shuffleBtn.addEventListener("click", function (e) {
    if (curColNumber !== 0) shuffleColumsHeight(curColNumber);
});

// Event: Prevent FORM form submitting
colNumForm.addEventListener("submit", (event) => {
    event.preventDefault();
});
sidebarForm.addEventListener("submit", (event) => {
    event.preventDefault();
});

// Event: Typein Columns number
colNumberDisplay.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {
        curColNumber = getValidColNumber();
        colNumberDisplay.value = curColNumber.toString();
        slider.value = curColNumber.toString();
        drawColumns(curColNumber);
        addColMouseEvent();
    }
});

// Event: Mouse over columns
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

// Event: Scroll navbar
const iconVisibility = () => {
    const scrollLeftValue = Math.ceil(selectionContainer.scrollLeft);
    const scrollAble =
        Math.ceil(selectionContainer.scrollWidth) -
        Math.ceil(selectionContainer.clientWidth);

    console.log(i + " : " + scrollLeftValue);
    i++;

    scrollLeftBtn.style.display = scrollLeftValue > 0 ? "block" : "none";
    scrollRightBtn.style.display =
        scrollAble > scrollLeftValue ? "block" : "none";
};
let i = 0;
scrollRightBtn.addEventListener("click", () => {
    selectionContainer.scrollLeft += 220;
    console.log(i + " : " + selectionContainer.scrollLeft);
    iconVisibility();
});

scrollLeftBtn.addEventListener("click", () => {
    selectionContainer.scrollLeft -= 110;
    iconVisibility();
});

iconVisibility();
