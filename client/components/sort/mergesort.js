/**
 * This module will export mergesort function, which will return instructions
 * in the Array<Object> type
 * Instructions:
 * obj1 = {
 *      type:       "divide",
 *      isAMove:    Boolean - Check if this instruction counted as a move
 *      start:      Number - The start index of the first sub-array
 *      mid:        Number - The end index of the first sub-array, `mid + 1` is
 *                  the start index of the second sub-array
 *      end:        Number - The end index of the second sub-array, -1 means there
 *                  is no second sub-array
 *      message:    String - The explaination of the current step
 * }
 *
 * obj2 = {
 *      type:       "compare",
 *      isAMove:    Boolean - Check if this instruction counted as a move
 *      p1:         Number - The index of the column in the first sub-array,
 *                  -1 means there is no column
 *      p2:         Number - The index of the column in the second sub-array,
 *                  -1 means there is no column
 *      message:    String - The explaination of the current step
 * }
 *
 * obj3 = {
 *      type:       "merge",
 *      isAMove:    Boolean - Check if this instruction counted as a move
 *      start:      Number - The start index of the merged array
 *      values:     Array<Number> - The list of sorted values
 *      message:    String - The explaination of the current step
 * }
 */
"use strict";

/**
 * Merge to sub-array from `src` to `target`
 * @param   {Array<Object>}     instructions    The instructions of how sort the array
 * @param   {Array<Number>}     src             The source array contains data that you want to merge to the target
 * @param   {Array<Number>}     target          The target array
 * @param   {Number}            start           The start index of the first sub-array
 * @param   {Number}            mid             The end index of the first sub-array, that also mean `mid + 1` is the start index of the second sub-array
 * @param   {Number}            end             The end index of the second sub-array
 * @param   {Boolean}           nonDecrease     Determine the sort order of the array
 * @returns {void}
 */
const merge = function (
    instructions,
    src,
    target,
    start,
    mid,
    end,
    nonDecrease = true
) {
    let i = start;
    let j = start;
    let k = mid + 1;
    let compareLeftRight;
    let choosenOne;
    let index1;
    let index2;

    while (j <= mid && k <= end) {
        index1 = j;
        index2 = k;

        if (src[j] < src[k]) {
            compareLeftRight = "shorter than";
        } else if (src[j] === src[k]) {
            compareLeftRight = "as high as";
        } else {
            compareLeftRight = "higher than";
        }

        if (src[j] <= src[k]) {
            if (nonDecrease) {
                choosenOne = 1;
                target[i++] = src[j++];
            } else {
                choosenOne = 2;
                target[i++] = src[k++];
            }
        } else {
            if (nonDecrease) {
                choosenOne = 2;
                target[i++] = src[k++];
            } else {
                choosenOne = 1;
                target[i++] = src[j++];
            }
        }

        instructions.push({
            type: "compare",
            isAMove: true,
            p1: index1,
            p2: index2,
            message: `Compare 2 columns:
            Column 1 at index ${index1} with value ${src[index1]}
            Column 2 at index ${index2} with value ${src[index2]}
            Column 1 is ${compareLeftRight} column 2, choose column ${choosenOne}`,
        });
    }

    while (j <= mid) {
        instructions.push({
            type: "compare",
            isAMove: true,
            p1: j,
            p2: -1,
            message: `The second sub-array has no elements left to consider, choose column 1`,
        });

        target[i++] = src[j++];
    }

    while (k <= end) {
        instructions.push({
            type: "compare",
            isAMove: true,
            p1: -1,
            p2: k,
            message: `The first sub-array has no elements left to consider, choose column 2`,
        });

        target[i++] = src[k++];
    }

    instructions.push({
        type: "merge",
        isAMove: false,
        start: start,
        values: target.slice(start, end + 1),
        message: `The merged result:
        [${target.slice(start, end + 1).join(", ")}]`,
    });
};

/**
 * Handle merging branches, each branch has maximum of `h` elements
 * @param       {Array<Object>}     instructions    The instructions of how sort the array
 * @param       {Array<Number>}     src             The source array
 * @param       {Array<Number>}     target          The target array (result of merging branches from `src`)
 * @param       {Number}            h               Maximum number of elements consider in a branch
 * @param       {Boolean}           nonDecrease     Determine the sort order of the array
 * @returns     {void}
 */
const conquer = function (instructions, src, target, h, nonDecrease = true) {
    let index = 0;
    const length = src.length;
    let start;
    let mid;
    let end;
    let firstSubArrayStr;
    let secondSubArrayStr;

    while (index + 2 * h <= length) {
        start = index;
        mid = index + h - 1;
        end = index + 2 * h - 1;
        firstSubArrayStr = src.slice(start, mid + 1).join(", ");
        secondSubArrayStr = src.slice(mid + 1, end + 1).join(", ");

        instructions.push({
            type: "divide",
            isAMove: false,
            start: start,
            mid: mid,
            end: end,
            message: `Consider the 2 following sub-arrays:
            [${firstSubArrayStr}]
            [${secondSubArrayStr}]`,
        });

        merge(instructions, src, target, start, mid, end, nonDecrease);
        index += 2 * h;
    }

    if (index + h < length) {
        start = index;
        mid = index + h - 1;
        end = length - 1;
        firstSubArrayStr = src.slice(start, mid + 1).join(", ");
        secondSubArrayStr = src.slice(mid + 1, end + 1).join(", ");

        instructions.push({
            type: "divide",
            isAMove: false,
            start: start,
            mid: mid,
            end: end,
            message: `Consider the 2 following sub-arrays:
            [${firstSubArrayStr}]
            [${secondSubArrayStr}]`,
        });

        merge(instructions, src, target, start, mid, end, nonDecrease);
    } else {
        start = index;
        mid = length - 1;
        end = -1;
        firstSubArrayStr = src.slice(start, mid + 1).join(", ");

        instructions.push({
            type: "divide",
            isAMove: false,
            start: start,
            mid: mid,
            end: end,
            message: `Consider the following sub-array:
            [${firstSubArrayStr}]`,
        });

        merge(instructions, src, target, start, mid, end, nonDecrease);
    }
};

/**
 * Use merge sort algorithm for array of number (with no recursion), Time complexity = Space complexity = O(n)
 * @param   {Array<Number>} arr             The array you want to sort
 * @param   {Boolean}       nonDecrease     Determine the sort order of the array
 * @returns {Array<Object>} The instruction of how to mergesort given array
 */
const mergesort = function (arr, nonDecrease = true) {
    const instructions = [];

    const length = arr.length;
    const helper = [];
    let h = 1;

    while (h < length) {
        conquer(instructions, arr, helper, h, nonDecrease);
        h *= 2;

        conquer(instructions, helper, arr, h, nonDecrease);
        h *= 2;
    }

    return instructions;
};

export default mergesort;
