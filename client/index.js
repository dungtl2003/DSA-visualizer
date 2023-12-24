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

let curColNumber = sliderDefaultValue;
let isSolving = false;
let abortController = null;

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
    if (isSolving) {
        abortController.abort();
        isSolving = false;
        abortController = null;
    }

    drawColumns(curColNumber);
    mouseHoverColumnEvent();
};

// Change the number of columns by typing instead of sliding
colNumberDisplay.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        if (isSolving) {
            abortController.abort();
            isSolving = false;
            abortController = null;
        }

        curColNumber = getValidColNumber();
        colNumberDisplay.value = curColNumber.toString();
        slider.value = curColNumber.toString();
        drawColumns(curColNumber);
        mouseHoverColumnEvent();
    }
});

// Solve with animations
btnSolve.addEventListener("click", async function () {
    // It is solving, do not solve again
    if (isSolving) return;

    isSolving = true;
    abortController = new AbortController();
    const values = [];
    for (const child of columnContainer.children) {
        values.push(
            Number(child.childNodes[0].getAttribute("data-percentage"))
        );
    }

    const instructions = mergesort(values);
    mergesortAmination(instructions, abortController.signal)
        .then(() => {
            isSolving = false;
            abortController = null;
        })
        .catch(() => {
            isSolving = false;
            abortController = null;
        });
});

// Shuffle the columns with animations
btnShuffle.addEventListener("click", function () {
    if (isSolving) {
        abortController.abort();
        isSolving = false;
        abortController = null;
    }

    shuffleColumns(curColNumber);
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
