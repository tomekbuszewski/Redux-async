const findObject = (counter, arr, key, query) => {
  if (typeof arr === 'undefined' || counter >= arr.length) { return false }

  if (arr[counter][key] === query) {
    return arr[counter];
  } else {
    return findObject(++counter, arr, key, query);
  }
};

export default findObject;