// Your task is to write a JavaScript function named memoize. This function 
// should take in another function as an argument and return a memoized version of it.

/**
 * Memoize function
 * @param {Function} fn - The function to be memoized
 * @returns {Function} - The memoized function
 */
function memoize(fn) {
    // Your code here
    const cache = new Map();

    return function(...args){ // args can be multiple
        const key = JSON.stringify(args);

        if(cache.has(key)) return cache.get(key);

        const result = fn(...args);
        cache.set(key,result);
        return result;
    }
  }
  
  // Test case
  function square(n) {
    let result = 0;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        result++;
      }
    }
    return result;
  }
  
  const memoizedSquare = memoize(square);
  
  console.log(memoizedSquare(140));
  console.log(memoizedSquare(140));
  console.log(memoizedSquare(140));