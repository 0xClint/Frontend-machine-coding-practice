// // Basic fetch with default caching
// const breedsList = await cachedFetch(
//     'https://dog.ceo/api/breeds/list/all'
//   );

//   // Custom cache configuration
//   const breedsListCacheConfig = await cachedFetch(
//     'https://dog.ceo/api/breeds/list/all',
//     { headers: { Authorization: 'Bearer token' } },
//     {
//       enableCache: true,
//       expiryTime: 10 * 60 * 1000, // 10 minutes
//     }
//   );

//   // Disable caching
//   const breedsListNoCache = await cachedFetch(
//     'https://dog.ceo/api/breeds/list/all',
//     {},
//     { enableCache: false }
//   );

//   // Additional utility methods
//   cachedFetch.clearCache(); // Clear entire cache
//   cachedFetch.clearCache(
//     'https://dog.ceo/api/breeds/list/all'
//   ); // Clear specific URL cache

const DEFAULT_CACHE_EXPIRY = 5 * 60 * 1000;

/**
 * Creates a cached fetch utility
 * @returns {Function} Cached fetch function with utility methods
 */
function createCachedFetch() {

    const cache = new Map();

    async function cachedFetch(url, reqBody = {}, cacheConfig = {}) {

        const isCacheEnable = cacheConfig.enableCache ?? true;
        const expiry = cacheConfig.expiryTime ?? DEFAULT_CACHE_EXPIRY;
        const cachedEntry = cache.get(url);

        const currentTime = Date.now();

        if (isCacheEnable && cachedEntry && cachedEntry.expiry > currentTime) {
            return cachedEntry.result;
        }

        try {
            const response = await fetch(url, reqBody);
            const result = await response.json();

            if (isCacheEnable)
                cache.set(url, { result, expiry: currentTime + expiry });

            return result;
        } catch (e) {

            if (cachedEntry) {
                console.error("Fetched failed returned stale cached!");
                return cachedEntry.result
            }
            throw e;
        }
    }

    cachedFetch.clearCache = function (entry) {
        if (entry) {
            cache.delete(entry)
        } else {
            cache.clear()
        }
    }

    return cachedFetch;
}

// Create and export the cached fetch function
const cachedFetch = createCachedFetch();

// Example usage
async function exampleUsage() {
    try {
        // Basic fetch with default caching
        const breedsList = await cachedFetch(
            'https://dog.ceo/api/breeds/list/all'
        );

        console.log('breedsList', breedsList);
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

exampleUsage();