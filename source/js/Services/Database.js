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