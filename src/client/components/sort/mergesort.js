"use strict";

/**
 * Merge to sub-array from `src` to `target`
 * @param   {Array<Number>}   src             The source array contains data that you want to merge to the target
 * @param   {Array<Number>}   target          The target array
 * @param   {Number}          start           The start index of the first sub-array
 * @param   {Number}          mid             The end index of the first sub-array, that also mean `mid + 1` is the start index of the second sub-array
 * @param   {Number}          end             The end index of the second sub-array
 * @param   {Boolean}         nonDecrease     Determine the sort order of the array
 * @returns {void}
 */
const merge = function (src, target, start, mid, end, nonDecrease = true) {
    let i = start;
    let j = start;
    let k = mid + 1;

    while (j <= mid && k <= end) {
        if (src[j] <= src[k]) {
            target[i++] = nonDecrease ? src[j++] : src[k++];
        } else {
            target[i++] = nonDecrease ? src[k++] : src[j++];
        }
    }

    while (j <= mid) {
        target[i++] = src[j++];
    }

    while (k <= end) {
        target[i++] = src[k++];
    }
};

/**
 * Handle merging branches, each branch has maximum of `h` elements
 * @param       {Array<Number}  src             The source array
 * @param       {Array<Number>} target          The target array (result of merging branches from `src`)
 * @param       {Number}        h               Maximum number of elements consider in a branch
 * @param       {Boolean}       nonDecrease     Determine the sort order of the array
 * @returns     {void}
 */
const conquer = function (src, target, h, nonDecrease = true) {
    let index = 0;
    const length = src.length;

    while (index + 2 * h <= length) {
        const obj = {
            type: "divide",
            start: index,
            end: index + 2 * h - 1,
        };

        instructions.push(obj);
        merge(
            src,
            target,
            index,
            index + h - 1,
            index + 2 * h - 1,
            nonDecrease
        );
        index += 2 * h;
    }

    if (index + h < length) {
        merge(src, target, index, index + h - 1, length - 1, nonDecrease);
    } else {
        while (index < length) {
            target[index] = src[index++];
        }
    }
};

/**
 * Use merge sort algorithm for array of number (with no recursion), Time complexity = Space complexity = O(n)
 * @param   {Array<Number>} arr             The array you want to sort
 * @param   {Boolean}       nonDecrease     Determine the sort order of the array
 * @returns {void}
 */
const mergeSort = function (arr, nonDecrease = true) {
    const length = arr.length;
    const helper = [];
    let h = 1;

    while (h < length) {
        conquer(arr, helper, h, nonDecrease);
        h *= 2;

        conquer(helper, arr, h, nonDecrease);
        h *= 2;
    }
};
