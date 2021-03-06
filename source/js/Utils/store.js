import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

import reducers from '../Reducers';

import { CACHE_URL } from '../../config';

const client = axios.create({
  baseURL: CACHE_URL,
  responseType: 'json'
});

const initial = typeof window !== 'undefined' ? typeof window.__INITIAL__ !== 'undefined' ? window.__INITIAL__ : {} : {};
const composeEnhancers = typeof window !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose;
const middleware = [ thunk, axiosMiddleware(client) ];

let store = createStore(reducers, initial, composeEnhancers(applyMiddleware(...middleware)));

if (typeof window === 'undefined') {
  store = createStore(reducers);
}

export const makeStore = initial => createStore(reducers, initial);
export default store;