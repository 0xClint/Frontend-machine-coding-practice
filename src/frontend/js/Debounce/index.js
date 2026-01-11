/**
 * Debounce function
 * @param {Function} fn - The function to be debounced
 * @param {number} delay - The delay in milliseconds
 * @returns {Function} - The debounced function
 */

function debounce(fn, delay) {
    // Your code here
    let timerId = null;

    return (...args) => {
        if(timerId) window.clearTimeout(timerId);

        timerId = window.setTimeout(()=>{
            return fn.apply(this,args);
        },delay)
     };
}

// Test case 1: Basic debounce - execute the function after 1000ms of inactivity
const debouncedFunc = debounce(
    () => console.log('Hello'),
    1000
);
debouncedFunc(); // Should not log anything
debouncedFunc(); // Should not log anything
// Wait for 1000ms without any function calls
// Only then should 'Hello' be logged
