"use strict";

import {sliderDefaultValue} from "./common/defaults.js";
import {drawColumns, shuffleColumns} from "./common/column.js";
import mergesort from "./components/sort/mergesort.js";
import {animation, setDuration} from "./animations/sort/mergesort.js";
import {getValidColNumber, getValidSpeed} from "./common/utils.js";

const slider = document.getElementById("body__sidebar__slider");
const colNumberDisplay = document.getElementById("body__sidebar__col-num");
const sortingSpeed = document.getElementById("body__sidebar__animate-speed");
const columnContainer = document.getElementById(
    "body__main-content__display__frame"
);
const btnSolve = document.getElementById("body__sidebar__btn-item--solve");
const btnShuffle = document.getElementById("body__sidebar__btn-item--shuffle");
const formSubAborted = document.querySelectorAll(".abort-from-submission");
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
const logsScreen = document.getElementById("body__side-text-area");
const movesDisplay = document.getElementById("body__sidebar__moves-num");
const bodyScrollableValue =
    Math.ceil(bodyScrollBar.scrollWidth) - Math.ceil(bodyScrollBar.clientWidth);
let curColNumber = sliderDefaultValue;
let bodyScrollBarValue = 0;
let checkBodyScrollBtnClicked = false;
const jump = 110;

let isSolving = false;
let abortController = null;

window.onpageshow = function (event) {
    if (event.persisted) {
        // reload each time go out of the current page
        window.location.reload();
    }
};

// Clear logs
const clearLogs = function () {
    logsScreen.replaceChildren();
    movesDisplay.innerHTML = 0;
};

// Prevent form from submitting
formSubAborted.forEach((form) => {
    form.addEventListener("submit", (event) => {
        event.preventDefault();
    });
});

// Slider to change the number of columns
slider.oninput = function () {
    curColNumber = Number(this.value);
    colNumberDisplay.value = this.value;
};
slider.onchange = function () {
    if (isSolving) {
        clearLogs();

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
            clearLogs();

            abortController.abort();
            isSolving = false;
            abortController = null;
        }

        curColNumber = getValidColNumber();
        colNumberDisplay.value = curColNumber.toString();
        slider.value = curColNumber.toString();
        colNumberDisplay.blur();
        drawColumns(curColNumber);
        mouseHoverColumnEvent();
    }
});

// Change the animation's speed
sortingSpeed.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        if (isSolving) {
            clearLogs();

            abortController.abort();
            isSolving = false;
            abortController = null;
        }
        const validSpeed = getValidSpeed();
        setDuration(validSpeed);
        sortingSpeed.value = validSpeed.toString();
        sortingSpeed.blur();
    }
});

// Solve with animations
btnSolve.addEventListener("click", async function () {
    // It is solving, do not solve again
    if (isSolving) return;

    clearLogs();
    isSolving = true;
    abortController = new AbortController();
    const values = [];
    for (const child of columnContainer.children) {
        values.push(
            Number(child.childNodes[0].getAttribute("data-percentage"))
        );
    }
    const instructions = mergesort(values);
    animation(instructions, abortController.signal)
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
        clearLogs();

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
