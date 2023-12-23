"use strict";

import {sliderDefaultValue} from "./common/defaults.js";
import {drawColumns, shuffleColumns} from "./common/column.js";
import mergesort from "./components/sort/mergesort.js";
import mergesortAmination from "./animations/sort/mergesort.js";
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
const btnScrollLeft = document.getElementById(
    "body__main-content__scroll-btn--left"
);
const btnScrollRight = document.getElementById(
    "body__main-content__scroll-btn--right"
);
const selectionContainer = document.getElementById("type-selection");
let curColNumber = sliderDefaultValue;

window.onpageshow = function (event) {
    if (event.persisted) {
        // reload each time go out of the current page
        window.location.reload();
    }
};

// Prevent form from submitting
colNumForm.addEventListener("submit", (event) => {
    event.preventDefault();
});
sidebarForm.addEventListener("submit", (event) => {
    event.preventDefault();
});

// Slider to change the number of columns
slider.oninput = function () {
    curColNumber = Number(this.value);
    colNumberDisplay.value = this.value;
};
slider.onchange = function () {
    drawColumns(curColNumber);
    mouseHoverColumnEvent();
};

// Change the number of columns by typing instead of sliding
colNumberDisplay.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        curColNumber = getValidColNumber();
        colNumberDisplay.value = curColNumber.toString();
        slider.value = curColNumber.toString();
        drawColumns(curColNumber);
        mouseHoverColumnEvent();
    }
});

// Solve with animations
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

// Shuffle the columns with animations
btnShuffle.addEventListener("click", function () {
    if (curColNumber !== 0) shuffleColumns(curColNumber);
});

// See value of hovered column
const mouseHoverColumnEvent = function () {
    document
        .querySelectorAll(".body__main-content__display__col")
        .forEach((e) => {
            e.addEventListener("mouseover", function () {
                const valueElement = document.createElement("div");
                valueElement.setAttribute(
                    "id",
                    "body__main-content__display__value"
                );
                valueElement.innerHTML = e.getAttribute("data-percentage");
                e.parentNode.appendChild(valueElement);
            });
            e.addEventListener("mouseout", function () {
                const valueElement = document.getElementById(
                    "body__main-content__display__value"
                );
                e.parentNode.removeChild(valueElement);
            });
        });
};
mouseHoverColumnEvent();

// Event: Scroll navbar
const iconVisibility = () => {
    const scrollLeftValue = Math.ceil(selectionContainer.scrollLeft);
    const scrollAble =
        Math.ceil(selectionContainer.scrollWidth) -
        Math.ceil(selectionContainer.clientWidth);

    console.log(i + " : " + scrollLeftValue);
    i++;

    btnScrollLeft.style.display = scrollLeftValue > 0 ? "block" : "none";
    btnScrollRight.style.display =
        scrollAble > scrollLeftValue ? "block" : "none";
};
let i = 0;
btnScrollRight.addEventListener("click", () => {
    selectionContainer.scrollLeft += 220;
    console.log(i + " : " + selectionContainer.scrollLeft);
    iconVisibility();
});

btnScrollLeft.addEventListener("click", () => {
    selectionContainer.scrollLeft -= 110;
    iconVisibility();
});

iconVisibility();
