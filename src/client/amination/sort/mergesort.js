const sleepTime = 3000;
const animateDuration = 1500;

const columnContainer = document.getElementById(
    "body__main-content__display__frame"
);

const drawColumn = function (columnElement) {
    $(columnElement).animate(
        {
            height: columnElement.getAttribute("data-percentage") + "%",
        },
        animateDuration
    );
};

const paintColumn = function (column, color, time) {
    const oldColor = column.getAttribute("background-color");
    column.style.background = color;
    setTimeout(() => {
        column.style.background = oldColor;
    }, time);
};

const sleep = async () => {
    setTimeout(() => {}, sleepTime);
};

const compare = async function (instruction, columns) {
    if (instruction.p1 !== -1) {
        paintColumn(columns[instruction.p1].childNodes[0], "red", sleepTime);
    }
    if (instruction.p2 !== -1) {
        paintColumn(columns[instruction.p2].childNodes[0], "red", sleepTime);
    }
};

const divide = async function (instruction, columns) {
    // columns[instruction.start].setAttribute("background-color", "yellow");
    // columns[instruction.mid].setAttribute("background-color", "yellow");
    // columns[instruction.mid + 1].setAttribute("background-color", "blue");
    // columns[instruction.end].setAttribute("background-color", "blue");
    // sleep();
};

const merge = async function (instruction, columns) {
    let dataIndex = 0;
    for (let i = instruction.start; i <= instruction.end; i++) {
        columns[i].setAttribute(
            "data-percentage",
            instruction.values[dataIndex++]
        );
        drawColumn(columns[index]);
    }
};

const executeAsync = async (instruction) => {
    let columns = columnContainer.children;
    switch (instruction.type) {
        case "divide":
            await divide(instruction, columns);
            break;
        case "compare":
            await compare(instruction, columns);
            break;
        case "merge":
            console.log("merge");
            await merge(instruction, columns);
            break;
    }
};

const runSortingAnimation = async function (instructions) {
    const date = new Date();
    const start = date.getSeconds();
    for (const instruction of instructions) {
        await executeAsync(instruction);
        await sleep();
    }
    console.log("Execute time", date.getSeconds() - start);
};

export default runSortingAnimation;
