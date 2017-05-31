import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from '../Reducers';

const initial = typeof window !== 'undefined' ?
  typeof window.__INITIAL__ !== 'undefined' ?
    window.__INITIAL__ :
    {} :
  {};
const composeEnhancers = typeof window !== 'undefined' ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose :
  compose;
const middleware = [ thunk ];

let store = createStore(reducers, initial, composeEnhancers(applyMiddleware(...middleware)));

if (typeof window === 'undefined') {
    store = createStore(reducers);
}

export default store;