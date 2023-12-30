"use strict";

const colsSlider = document.getElementById("body__sidebar__slider");
const speedSlider = document.getElementById("body__sidebar__slider--speed");
const colNumberDisplay = document.getElementById("body__sidebar__col-num");
const speedDisplay = document.getElementById("body__sidebar__animate-speed");
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
const jump = 110;

let sliderDefaultValue;
let defaultSpeed;
let drawColumns;
let shuffleColumns;
let mergesort;
let animation;
let setSpeed;
let getValidColNumber;
let curColNumber;
let bodyScrollBarValue = 0;
let checkBodyScrollBtnClicked = false;
let isSolving = false;
let isShuffling = false;
let abortController = null;

document.querySelectorAll(".function-coming-soon").forEach((e) => {
    e.addEventListener("click", function () {
        document.getElementById("alert-screen").style.display = "flex";
    });
});

document
    .getElementById("alert-panel__confirm")
    .addEventListener("click", function () {
        document.getElementById("alert-screen").style.display = "none";
    });

async function getComponents() {
    const {sliderDefaultValue, defaultSpeed} = await import(
        "./common/defaults.js"
    );
    const {drawColumns, shuffleColumns} = await import("./common/column.js");
    const {default: mergesort} = await import("./components/sort/mergesort.js");
    const {animation, setSpeed} = await import(
        "./animations/sort/mergesort.js"
    );
    const {getValidColNumber} = await import("./common/utils.js");

    return {
        sliderDefaultValue,
        defaultSpeed,
        drawColumns,
        shuffleColumns,
        mergesort,
        animation,
        getValidColNumber,
        setSpeed,
    };
}
// load the components
getComponents()
    .then((values) => {
        ({
            sliderDefaultValue,
            defaultSpeed,
            drawColumns,
            shuffleColumns,
            mergesort,
            animation,
            setSpeed,
            getValidColNumber,
            setSpeed,
        } = values);

        curColNumber = sliderDefaultValue;

        process();
    })
    .catch(
        (error) => `An error occurred while loading the components
        Error: ${error}`
    );

const process = function () {
    window.onpageshow = function (event) {
        if (event.persisted) {
            // reload each time go out of the current page
            window.location.reload();
        }
    };

    // Prevent form from submitting
    formSubAborted.forEach((form) => {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
        });
    });

    // Clear logs
    const clearLogs = function () {
        logsScreen.replaceChildren();
        movesDisplay.innerHTML = 0;
    };

    // Change the number of columns
    const changeColAmount = function () {
        isShuffling = false;
        if (isSolving) {
            clearLogs();

            abortController.abort();
            isSolving = false;
            abortController = null;
        }

        curColNumber = getValidColNumber();
        colNumberDisplay.value = curColNumber.toString();
        colsSlider.value = curColNumber.toString();
        colNumberDisplay.blur();
        drawColumns(curColNumber);
        mouseHoverColumnEvent();
    };

    // Slider to change the number of columns
    colsSlider.oninput = function () {
        curColNumber = Number(this.value);
        colNumberDisplay.value = this.value;
    };
    colsSlider.onchange = function () {
        changeColAmount();
    };

    // Change the number of columns by typing instead of sliding
    colNumberDisplay.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            changeColAmount();
        }
    });
    // Make sure if user does not press Enter, reset to previous value
    colNumberDisplay.addEventListener("blur", function () {
        colNumberDisplay.value = curColNumber.toString();
    });

    // Change the animation's speed
    speedSlider.oninput = function () {
        speedDisplay.value = this.value;
    };

    speedSlider.onchange = function () {
        if (isSolving) {
            clearLogs();

            abortController.abort();
            isSolving = false;
            abortController = null;
        }

        speedDisplay.value = this.value;
        setSpeed(1 / Number(this.value));
    };

    // Solve with animations
    btnSolve.addEventListener("click", async function () {
        // It is solving, do not solve again
        if (isShuffling) return;
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
    btnShuffle.addEventListener("click", async function () {
        if (isShuffling) return;

        if (isSolving) {
            clearLogs();

            abortController.abort();
            isSolving = false;
            abortController = null;
        }

        isShuffling = true;
        await shuffleColumns(curColNumber);
        isShuffling = false;
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
                    const rewriteContent = (mutationList) => {
                        mutationList.forEach((mutationRecord) => {
                            valueElement.innerHTML = Math.round(
                                e.style.height.replace("%", "")
                            );
                        });
                    };
                    const observer = new MutationObserver(rewriteContent);
                    observer.observe(e, {
                        attributes: true,
                        attributeFilter: ["style"],
                    });

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
    // Need to wait for the browser to render before calculating
    setTimeout(() => {
        const bodyScrollableValue =
            Math.ceil(bodyScrollBar.scrollWidth) -
            Math.ceil(bodyScrollBar.clientWidth);

        const iconVisibility = () => {
            btnBodyScrollLeft.style.display =
                bodyScrollBarValue > 0 ? "block" : "none";
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
            iconVisibility();
        });

        iconVisibility();

        // Scroll header navbar
        btnHeaderScrollRight.addEventListener("click", () => {
            headerScrollBar.scrollLeft += jump;
        });

        btnHeaderScrollLeft.addEventListener("click", () => {
            headerScrollBar.scrollLeft -= jump;
        });
    }, 0);
};
