/**
 * Simple service for checking whether your result is really what you want.
 * @author Tomek Buszewski <tomasz.buszewski@rp.pl>
 */
const expect = (() => {
  const attribute = (input, attr) => {
    return input.hasAttribute(attr) ? input.getAttribute(attr) : false;
  };

  const anArray = input => {
    return Object.prototype.toString.call(input) === '[object Array]';
  };

  const anObject = input => {
    return typeof input === 'object' && !anArray(input);
  };

  const lengthy = input => {
    return anArray(input) && input.length > 0;
  };

  const nonEmptyObject = input => {
    return anObject(input) && Object.keys(input).length > 0;
  };

  const objectToHave = (input, what) => {
    return anObject(input) && {}.hasOwnProperty.call(input, what);
  };

  const arrayToHave = (input, what) => {
    return anArray(input) && input.indexOf(what) !== -1;
  };

  const present = input => {
    try {
      return (
        typeof input !== 'undefined' &&
        input !== null
      )
    } catch (e) {
      return false
    }

  };

  const string = input => {
    return present(input) && typeof input === 'string' && input !== '';
  };

  const arraysToEqual = (a, b) => {
    return anArray(a) && anArray(b) && JSON.stringify(a) === JSON.stringify(b);
  };

  const arrayToHaveObject = (input, whatName, whatValue) => {
    for (const item of input) {
      return item[whatName] === whatValue
    }

    return false
  };

  const truthy = input => {
    return (
      typeof input !== 'undefined' &&
      input === true
    )
  };

  const falsy = input => {
    return (
      typeof input !== 'undefined' &&
      input === false
    )
  };

  return {
    attribute,
    anArray,
    anObject,
    lengthy,
    truthy,
    string,
    falsy,
    objectToHave,
    arrayToHave,
    present,
    arrayToHaveObject,
    arraysToEqual,
    nonEmptyObject
  }
})();

export default expect;
