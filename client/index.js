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
const btnBodyScrollLeft = document.getElementById(
    "body__main-content__scroll-btn--left"
);
const btnBodyScrollRight = document.getElementById(
    "body__main-content__scroll-btn--right"
);
const bodyScrollBar = document.getElementById("type-selection");
const headerScrollBar = document.getElementById("header__catebar__list");
const btnHeaderScrollLeft = document.getElementById(
    "header__catebar__scroll-btn--left"
);
const btnHeaderScrollRight = document.getElementById(
    "header__catebar__scroll-btn--right"
);
const bodyScrollableValue =
    Math.ceil(bodyScrollBar.scrollWidth) - Math.ceil(bodyScrollBar.clientWidth);
let curColNumber = sliderDefaultValue;
let bodyScrollBarValue = 0;
let checkBodyScrollBtnClicked = false;
const jump = 110;

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

// Scroll body navbar
const iconVisibility = () => {
    btnBodyScrollLeft.style.display = bodyScrollBarValue > 0 ? "block" : "none";
    btnBodyScrollRight.style.display =
        bodyScrollableValue > bodyScrollBarValue ? "block" : "none";
    checkBodyScrollBtnClicked = false;
};

btnBodyScrollRight.addEventListener("click", () => {
    bodyScrollBarValue =
        bodyScrollBarValue + jump >= bodyScrollableValue
            ? bodyScrollableValue
            : bodyScrollBarValue + jump;
    checkBodyScrollBtnClicked = true;
    bodyScrollBar.scrollLeft += jump;
});

btnBodyScrollLeft.addEventListener("click", () => {
    bodyScrollBarValue =
        bodyScrollBarValue - jump <= 0 ? 0 : bodyScrollBarValue - jump;
    checkBodyScrollBtnClicked = true;
    bodyScrollBar.scrollLeft -= jump;
});

bodyScrollBar.addEventListener("scroll", () => {
    if (!checkBodyScrollBtnClicked) {
        bodyScrollBarValue = Math.ceil(bodyScrollBar.scrollLeft);
    }
    if (bodyScrollBar.scrollLeft === bodyScrollBarValue) {
        iconVisibility();
    }
});

iconVisibility();

// Scroll header navbar

btnHeaderScrollRight.addEventListener("click", () => {
    headerScrollBar.scrollLeft += jump;
});

btnHeaderScrollLeft.addEventListener("click", () => {
    headerScrollBar.scrollLeft -= jump;
});
