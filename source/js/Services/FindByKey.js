const findByKey = (counter = 0, arr, key, query = 'key', returnValue = true) => {
  if (counter >= arr.length) { return false; }

  if (arr[counter][query] === key) {
    return returnValue ? arr[counter].value : arr[counter];
  } else {
    return findByKey(++counter, arr, key, query, returnValue)
  }
};

export default findByKey;