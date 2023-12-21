const duration = 1000;

const columnContainer = document.getElementById(
    "body__main-content__display__frame"
);

/**
 * Draw the column element
 * @param   {HTMLLIElement} column The column element
 * @returns {void}
 */
const draw = function (column) {
    $(column.childNodes[0]).animate(
        {
            height: column.childNodes[0].getAttribute("data-percentage") + "%",
        },
        duration
    );
};

/**
 * Change color of the column to `color` for `duration` time
 * @param   {HTMLLIElement} column  The column element
 * @param   {String}        color   Color to paint the column
 * @returns {void}
 */
const paint = function (column, color) {
    const oldColor = column.getAttribute("background-color");

    column.style.background = color;
    setTimeout(() => {
        column.style.background = oldColor;
    }, duration);
};

/**
 * Handle the compare amination
 * @param   {Object}                  instruction   The instruction to animate
 * @param   {Array<HTMLLIElement>}    columns       List of column elements
 * @param   {String}                  color         Color to paint both the columns
 * @returns {void}
 */
const compare = function (instruction, columns, color = "red") {
    if (instruction.p1 !== -1) {
        paint(columns[instruction.p1].childNodes[0], color, duration);
    }
    if (instruction.p2 !== -1) {
        paint(columns[instruction.p2].childNodes[0], color, duration);
    }
};

const divide = function (instruction, columns) {
    // columns[instruction.start].setAttribute("background-color", "yellow");
    // columns[instruction.mid].setAttribute("background-color", "yellow");
    // columns[instruction.mid + 1].setAttribute("background-color", "blue");
    // columns[instruction.end].setAttribute("background-color", "blue");
    // sleep();
};

/**
 * Handle the merge amination
 * @param   {Object}                  instruction   The instruction to animate
 * @param   {Array<HTMLLIElement>}    columns       List of column elements
 * @returns {void}
 */
const merge = function (instruction, columns) {
    let dataIndex = 0;
    const values = instruction.values;
    const start = instruction.start;
    const end = start + values.length - 1;
    for (let i = start; i <= end; i++) {
        console.log(values[dataIndex]);
        columns[i].childNodes[0].setAttribute(
            "data-percentage",
            values[dataIndex++]
        );
        console.log(columns[i].childNodes[0].getAttribute("data-percentage"));
        draw(columns[i]);
    }
};

/**
 * Handle animation following the `instruction`
 * @param   {Object}        instruction   The instruction to animate
 * @returns {Promise}
 */
const handle = async function (instruction) {
    let columns = columnContainer.children;

    return new Promise((resolve) => {
        switch (instruction.type) {
            case "divide":
                divide(instruction, columns);
                break;
            case "compare":
                compare(instruction, columns);
                break;
            case "merge":
                merge(instruction, columns);
                break;
        }

        setTimeout(() => {
            resolve();
        }, duration);
    });
};

/**
 * Run animation of all `instructions`
 * @param   {Array<Object>}     instructions   All instructions to follow
 * @returns {void}
 */
const animation = async function (instructions) {
    for (const instruction of instructions) {
        await handle(instruction);
    }
};

export default animation;
