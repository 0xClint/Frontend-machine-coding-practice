// Implement a function getAllCities(country) that uses the provided APIs (getStates and getCities) 
// to return a promise resolving to an array of all cities in the given country.

// These are the APIs you'll be working with
function getStates(country) {
    // This is just a mock - in real scenario this would be an API call
    return Promise.resolve(['CA', 'NY', 'WA']);
}

function getCities(state) {
    // This is just a mock - in real scenario this would be an API call
    const cityMap = {
        CA: ['LA', 'SF', 'SD'],
        NY: ['LA1', 'SF1', 'SD1'],
        WA: ['LA2', 'SF2', 'SD2'],
    };
    return Promise.resolve(cityMap[state]);
}

// your solution

async function getAllCities(country) {

    try {
        const states = await getStates(country);

        const cityPromise = states.map((state) => getCities(state));
        const cities = await Promise.all(cityPromise);

        return cities.flat();
    } catch (error) {
        throw error;
    }
}

// Test the function
getAllCities('USA')
    .then((cities) => {
        console.log(cities);
        // Will output: ['LA', 'SF', 'SD', 'LA1', 'SF1', 'SD1', 'LA2', 'SF2', 'SD2']
    })
    .catch((error) => {
        console.error('Error:', error);
    });
