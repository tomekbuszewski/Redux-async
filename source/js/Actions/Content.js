import builder from '../Services/ActionNameBuilder';
import { START_TRANSITION, END_TRANSITION } from './Transitions';

const PREFIX = 'content';

export const FETCH_POST = builder(PREFIX, 'fetch post');

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
    payload: {
      request: {
        url
      }
    }
  }).then(() => {
    // And in the end we end with exit transition
    dispatch({ type: END_TRANSITION })
  })
};