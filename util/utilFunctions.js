// Returns a Unix timestamp for one week from the current time
const getOneWeekFromNow = () => {
    const oneWeekInMs = 7 * 24 * 60 * 60 * 1000; // One week in milliseconds
    const oneWeekFromNow = Date.now() + oneWeekInMs; // Current time + one week
    return Math.floor(oneWeekFromNow / 1000); // Convert to Unix timestamp in seconds
};

// Returns a Unix timestamp for one day from now
const getOneDayFromNow = () => {
    const oneDayInMs = 24 * 60 * 60 * 1000; // One day in milliseconds
    const oneDayFromNow = Date.now() + oneDayInMs;
    return Math.floor(oneDayFromNow / 1000); // Convert to Unix timestamp in seconds
};

// Returns a Unix timestamp for one hour from now
const getOneHourFromNow = () => {
    const oneHourInMs = 60 * 60 * 1000; // One hour in milliseconds
    const oneHourFromNow = Date.now() + oneHourInMs;
    return Math.floor(oneHourFromNow / 1000); // Convert to Unix timestamp in seconds
};

// Returns a Unix timestamp for two days from now
const getTwoDaysFromNow = () => {
    const twoDaysInMs = 2 * 24 * 60 * 60 * 1000; // Two days in milliseconds
    const twoDaysFromNow = Date.now() + twoDaysInMs;
    return Math.floor(twoDaysFromNow / 1000); // Convert to Unix timestamp in seconds
};

// Returns a Unix timestamp for three hours from now
const getThreeHoursFromNow = () => {
    const threeHoursInMs = 3 * 60 * 60 * 1000; // Three hours in milliseconds
    const threeHoursFromNow = Date.now() + threeHoursInMs;
    return Math.floor(threeHoursFromNow / 1000); // Convert to Unix timestamp in seconds
};

module.exports = { getOneWeekFromNow, getOneDayFromNow, getOneHourFromNow, getTwoDaysFromNow, getThreeHoursFromNow };
