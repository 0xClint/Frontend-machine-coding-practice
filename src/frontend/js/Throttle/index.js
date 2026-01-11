/**
 * Throttle function
 * @param {Function} fn - The function to be throttled
 * @param {number} delay - The delay in milliseconds
 * @returns {Function} - The throttled function
 */
function throttle(fn, delay) {
    let flag = false;

    // Your code here
    return (...args) => {
        if (!flag) {
            fn.apply(this, args);
            flag = true;
            setTimeout(() => {
                flag = false;
            }, delay)
        }

    };
}

// Test case
const throttledFunc = throttle(
    () => console.log('Hello'),
    1000
);
throttledFunc(); // Should log 'Hello'
throttledFunc(); // Should not log anything
// Wait for 1000ms
setTimeout(throttledFunc, 2000); // Should log 'Hello'
