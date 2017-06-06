const findObject = (counter, arr, key, query) => {
  if (counter >= arr.length) { return false }

  if (arr[counter][key] === query) {
    return arr[counter];
  } else {
    return findObject(++counter, arr, key, query);
  }
};

export default findObject;