import findObject from './FindObject';

/**
 * Function that finds post in database by given criteria
 * @param {array} database - given database
 * @param {string} field - matched field
 * @param {string} query - criteria
 * @returns {object|undefined} - either post or undefined
 */
export const getPost = (database, field, query) => {
  return database.find(p => {
    return p[field] === query
  });
};

/**
 * Function returning index of current post in given database
 * @param {array} database - collection of posts
 * @param {string} url - link for the post
 * @returns {number|Number} - index
 */
export const getIndex = (database, url) => {
  const POST = getPost(database, 'url', url);

  return database.indexOf(POST);
};

/**
 * Function that finds index of given item in given database
 * @param {array} database - given database
 * @param {string} item - criteria
 * @returns {number} - index
 */
export const checkForFetched = (database, item) => {
  return database.indexOf(item) > -1;
};

/**
 * Function that decides what - if anything - needs to be fetched
 * @param {object} database - current store
 * @param {string} url - provided url
 * @param {object} answers - variables to be returned
 * @returns {string} - state
 */
export const resolvePost = (database, url, answers) => {
  const FETCHED = database.Content.fetched;
  const POSTS = database.Content.content;
  const checkForContent = post => {
    return post.content !== null;
  };

  if (checkForFetched(FETCHED, url)) {
    const POST = getPost(POSTS, 'url', url);
    if (checkForContent(POST)) {
      return answers.indb;
    } else {
      return answers.fetchcontent;
    }
  } else {
    return answers.fetchpost;
  }
};

/**
 * Function that decides what - if anything - needs to be fetched
 * @param {object} database - current store
 * @param {string} url - provided url
 * @param {object} answers - variables to be returned
 * @returns {string} - state
 */
export const resolveCollection = (database, url, answers) => {
  const FETCHED = database.Content.fetched;

  if (checkForFetched(FETCHED, url)) {
    return answers.indb;
  } else {
    return answers.fetch;
  }
};

/**
 * Function that sorts a collection
 * @param {array} database - given collection
 * @param {string} field - on which field the sorting should occur
 * @param {boolean} desc - whether should sort descending or ascending
 * @returns {array} - sorted collection
 */
export const orderByCriteria = (database, field, desc = true) => {
  return database.sort((a, b) => desc ? b[field] - a[field] : a[field] - b[field]);
};

/**
 * Function that filters collection according to requirements
 * @param {array} database - given collection
 * @param {string} [parent=null] - array in the object
 * @param {string} field - field which against to filter
 * @param {string} value - value which against to filter
 * @returns {array} - filtered collection
 */
export const filterByCriteria = (database, parent = false, field, value) => {
  return (value === '' || value === null || parent === false || parent === null || typeof parent === 'undefined') ? database : database.filter(item => findObject(0, parent !== null ? item[parent] : item, field, value));
};