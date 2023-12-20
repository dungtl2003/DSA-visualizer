/**
 * This module will export mergesort function, which will return instructions
 * in the Array<Object> type
 * Instructions:
 * obj1 = {
 *      type:   "divide",
 *      start:  Number - The start index of the first sub-array
 *      mid:    Number - The end index of the first sub-array, `mid + 1` is
 *              the start index of the second sub-array
 *      end:    Number - The end index of the second sub-array, -1 means there
 *              is no second sub-array
 * }
 *
 * obj2 = {
 *      type:   "compare",
 *      p1:     Number - The index of the column in the first sub-array,
 *              -1 means there is no column
 *      p2:     Number - The index of the column in the second sub-array,
 *              -1 means there is no column
 * }
 *
 * obj3 = {
 *      type:       "merge",
 *      start:      Number - The start index of the merged array
 *      values:     Array<Number> - The list of sorted values
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

    while (j <= mid && k <= end) {
        instructions.push({
            type: "compare",
            p1: j,
            p2: k,
        });

        if (src[j] <= src[k]) {
            target[i++] = nonDecrease ? src[j++] : src[k++];
        } else {
            target[i++] = nonDecrease ? src[k++] : src[j++];
        }
    }

    while (j <= mid) {
        instructions.push({
            type: "compare",
            p1: j,
            p2: -1,
        });

        target[i++] = src[j++];
    }

    while (k <= end) {
        instructions.push({
            type: "compare",
            p1: -1,
            p2: k,
        });

        target[i++] = src[k++];
    }

    instructions.push({
        type: "merge",
        start: start,
        values: target.slice(start, end + 1),
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

    while (index + 2 * h <= length) {
        start = index;
        mid = index + h - 1;
        end = index + 2 * h - 1;

        instructions.push({
            type: "divide",
            start: start,
            mid: mid,
            end: end,
        });

        merge(instructions, src, target, start, mid, end, nonDecrease);
        index += 2 * h;
    }

    if (index + h < length) {
        start = index;
        mid = index + h - 1;
        end = length - 1;

        instructions.push({
            type: "divide",
            start: start,
            mid: mid,
            end: end,
        });

        merge(instructions, src, target, start, mid, end, nonDecrease);
    } else {
        start = index;
        mid = length - 1;
        end = -1;

        instructions.push({
            type: "divide",
            start: start,
            mid: mid,
            end: end,
        });

        while (index < length) {
            target[index] = src[index++];
        }
    }
};

/**
 * Use merge sort algorithm for array of number (with no recursion), Time complexity = Space complexity = O(n)
 * @param   {Array<Number>} arr             The array you want to sort
 * @param   {Boolean}       nonDecrease     Determine the sort order of the array
 * @returns {Array<Object>} The instruction of how to mergesort given array
 */
const mergeSort = function (arr, nonDecrease = true) {
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

export default mergeSort;
