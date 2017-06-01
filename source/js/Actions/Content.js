import some from 'lodash.some';

import builder from '../Services/ActionNameBuilder';
import { START_TRANSITION, END_TRANSITION } from './Transitions';

import store from '../Utils/store';

const PREFIX = 'content';

export const FETCH_POST = builder(PREFIX, 'fetch post');
export const INSERT_POST = builder(PREFIX, 'insert in database');
export const ALREADY_IN_DATABASE = builder(PREFIX, 'already in database');

/**
 * Action for fetching single post
 * @param {string} url - Url for post
 * @returns {undefined}
 */
export const fetch = url => dispatch => {
  // First we dispatch starting transition
  dispatch({ type: START_TRANSITION });

  // Then, we dispatch the fetch itself
  dispatch({
    type: FETCH_POST,
    payload: { request: { url } }
  }).then(r => {
    const POST = r.payload.data;
    const INDB  = some(store.getState().Content, POST);

    // We check if the post is in the database
    if (INDB) {
      dispatch({ type: ALREADY_IN_DATABASE });
    } else {
      dispatch({ type: INSERT_POST, payload: POST });
    }

    history.pushState(null, null, `#${url}`);
    // And in the end we end with exit transition
    dispatch({ type: END_TRANSITION })
  })
};