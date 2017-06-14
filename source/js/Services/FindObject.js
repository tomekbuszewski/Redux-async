/**
 * Function that finds object in an array based on given key/value query
 * @param {int} counter - incremental value
 * @param {array} arr - given array
 * @param {string} key - requested key
 * @param {string} query - requested value
 * @returns {object|boolean} - either object of false if nothing is found
 */
const findObject = (counter, arr, key, query) => {
  if (arr === null || typeof arr === 'undefined' || counter >= arr.length) { return false }

  if (arr[counter][key] === query) {
    return arr[counter];
  } else {
    return findObject(++counter, arr, key, query);
  }
};

export default findObject;