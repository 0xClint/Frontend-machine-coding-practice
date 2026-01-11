/**
 * Flatten a nested array
 * @param {Array} arr - The array to be flattened
 * @returns {Array} - The flattened array
 */
function flattenArray(arr) {
    // Your code here
    const result = [];
    const length = arr.length;

    for (let i = 0; i < length; i++) {
        if (Array.isArray(arr[i])) {
            const newArray = flattenArray(arr[i]);
            result.push(...newArray);

        } else
            result.push(arr[i]);
    }
    return result;
}

// Test 1
const arr1 = [1, 2, [3, 4, [5, 6]],null, undefined];
const flatArr1 = flattenArray(arr1);
console.log(flatArr1); // Expected: [1, 2, 3, 4, 5, 6]

// Test 2
const arr2 = [1, [2, [3, [4, [5, [6]]]]]];
const flatArr2 = flattenArray(arr2);
console.log(flatArr2); // Expected: [1, 2, 3, 4, 5, 6]
