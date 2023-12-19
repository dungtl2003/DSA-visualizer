"use strict";

const container = document.getElementById("container");
const columnData = new Array(1000).fill("Column").map((x, i) => x + i);

// Create columns dynamically
columnData.forEach((column) => {
    const columnElement = document.createElement("div");
    columnElement.classList.add("column");
    columnElement.textContent = column;
    container.appendChild(columnElement);
});

const elements = container.children;
const pos1 = 3;
const pos2 = 5;
let e1;
let e2;

for (let i = 0; i < elements.length; i++) {
    if (i === pos1) {
        e1 = elements[i];
        console.log(e1.textContent);
    }

    if (i === pos2) {
        e2 = elements[i + 1];
        console.log(elements[i].textContent);
        container.insertBefore(elements[i], e1);
        break;
    }
}

container.insertBefore(e1, e2);
