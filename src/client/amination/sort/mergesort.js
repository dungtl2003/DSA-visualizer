const relocate = function (instructions) {
    let columns = document.getElementsByClassName(
        "body__main-content__display__col"
    );

    // compare columns

    // combine into sorted columns
    for (let i = 0; i < columns.length; i++) {
        if (i === start) {
            let column = columns[i];

            column.setAttribute("data-percentage");
            reDrawColumn(column);
        }
    }
};

const reDrawColumn = function (columnElement) {
    columnElement.animate(
        {
            height: columnElement.data("percentage") + "%",
        },
        animateDuration
    );
};
