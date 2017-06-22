import builder from '../Services/ActionNameBuilder';
import { START_TRANSITION, END_TRANSITION } from './Transitions';
import { resolvePost, resolveCollection, getIndex, getPost } from '../Services/Database';
import { getPagination } from '../Services/UrlParser';

import store from '../Utils/store';

const PREFIX = 'content';

export const FETCH_POST = builder(PREFIX, 'fetch post');
export const FETCH_COLLECTION = builder(PREFIX, 'fetch collection');
export const FETCH_CONTENT = builder(PREFIX, 'fetch only content');
export const INSERT_POST = builder(PREFIX, 'insert in database');
export const INSERT_CONTENT = builder(PREFIX, 'add content to post');
export const ALREADY_IN_DATABASE = builder(PREFIX, 'already in database');
export const BUMP_PAGE = builder(PREFIX, 'bump pagination number');
export const NO_MORE_CONTENT = builder(PREFIX, 'no more posts to fetch');

/**
 * Matcher for type
 * @param {string} type - type from props
 * @returns {*} - type constant
 */
const matcher = type => {
  switch(type) {
    case 'collection':
      return FETCH_COLLECTION;
    case 'post':
    case 'page':
      return FETCH_POST;
    default:
      return FETCH_COLLECTION;
  }
};

/**
 * Action for fetching single post
 * @param {string} url - Url for post
 * @param {string} type [collection] - Type for fetching
 * @param {function|null} cb - Function to be executed after transition, if any
 * @returns {undefined}
 */
export const fetch = (url, type, cb = null) => dispatch => {
  const TYPE = matcher(type);
  const DATABASE = store.getState();

  // First we dispatch starting transition
  dispatch({ type: START_TRANSITION });

  setTimeout(() => {
    if (TYPE === FETCH_COLLECTION) {
      const RESOLVE_COLLECTION = resolveCollection(DATABASE, url, {
        indb:  ALREADY_IN_DATABASE,
        fetch: FETCH_COLLECTION
      });

      switch (RESOLVE_COLLECTION) {
        case FETCH_COLLECTION:
          dispatch({ type: FETCH_COLLECTION, payload: { request: { url } } }).then(r => {
            const POSTS = r.payload.data.posts;

            for (const POST of POSTS) {
              const ISIN = getPost(DATABASE.Content.content, 'url', POST.url);

              if (typeof ISIN === 'undefined') {
                dispatch({ type: INSERT_POST, payload: POST, url: POST.url });
              } else {
                dispatch({ type: ALREADY_IN_DATABASE });
              }
            }

            dispatch({ type: BUMP_PAGE, payload: getPagination(url, false) });

            if (typeof cb === 'function') cb();
            setTimeout(() => {dispatch({ type: END_TRANSITION })}, 250);
          }).catch(() => {
            dispatch({ type: NO_MORE_CONTENT, payload: getPagination(url, false) });
            dispatch({ type: END_TRANSITION });
          });
          break;
        case ALREADY_IN_DATABASE:
          dispatch({ type: ALREADY_IN_DATABASE });
          if (typeof cb === 'function') cb();
          setTimeout(() => { dispatch({ type: END_TRANSITION }) }, 250);
          break;
        default:
          dispatch({ type: RESOLVE_COLLECTION });
          dispatch({ type: END_TRANSITION });
          break;
      }
    } else {
      const RESOLVE_POST = resolvePost(DATABASE, url, {
        indb:         ALREADY_IN_DATABASE,
        fetchpost:    FETCH_POST,
        fetchcontent: FETCH_CONTENT
      });

      switch (RESOLVE_POST) {
        case FETCH_POST:
          dispatch({
            type:    FETCH_POST,
            payload: { request: { url } }
          }).then(r => {
            dispatch({ type: INSERT_POST, payload: r.payload.data, url });
            setTimeout(() => { dispatch({ type: END_TRANSITION }) }, 250);
          });
          break;
        case FETCH_CONTENT:
          dispatch({
            type:    FETCH_CONTENT,
            payload: { request: { url } }
          }).then(r => {
            dispatch({
              type:    INSERT_CONTENT,
              payload: { data: r.payload.data.content, id: getIndex(DATABASE.Content.content, url) }
            });
            if (typeof cb === 'function') cb();
            setTimeout(() => { dispatch({ type: END_TRANSITION }) }, 250);
          });
          break;
        case ALREADY_IN_DATABASE:
          dispatch({ type: ALREADY_IN_DATABASE });
          if (typeof cb === 'function') cb();
          setTimeout(() => { dispatch({ type: END_TRANSITION }) }, 250);
          break;
        default:
          dispatch({ type: RESOLVE_POST });
          setTimeout(() => { dispatch({ type: END_TRANSITION }) }, 250);
      }
    }
  }, 250)
};