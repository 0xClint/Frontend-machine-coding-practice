// Implement a function sum that allows you to add a sequence of numbers by calling 
// the function multiple times. The function should return another function that takes 
// the next number as an argument. When the final number is provided, the sum of all numbers 
// should be returned

/**
 * Function to sum a sequence of numbers
 * @param {number} num
 * @return {Function}
 */

const sum = (num) => {
    // your code here
    return function (nextNum) {
        if (nextNum) {
            return sum(nextNum + num);
        }
        return num;

    }
};

// Test Cases
console.log(sum(2)(3)()); // Returns 5
console.log(sum(2)(3)(5)()); // Returns 10
