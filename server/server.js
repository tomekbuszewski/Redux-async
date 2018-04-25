import React from 'react';
import { renderToString } from 'react-dom/server';
import webpack from 'webpack';
import express from 'express';
import axios from 'axios';
import serialize from 'serialize-javascript';
import path from 'path';
import compression from 'compression';
import fs from 'fs';
import apicache from 'apicache';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { Helmet } from 'react-helmet';

import config from '../webpack.config.dev';

import expect from '../source/js/Services/Expect';
import { getPagination, lastSlash } from '../source/js/Services/UrlParser';

import { API_URL } from '../source/config';
import { makeStore } from '../source/js/Utils/store';
import App from '../source/js/Components/App';

const app = express();
const compiler = webpack(config);
const PORT = 1199;
const CACHE_TIME = '10 minutes';
const COLLECTION = 'COLLECTION';
const SINGLE = 'SINGLE';
const CACHE = apicache.middleware;

/**
 * CSS string extracted from compiled file
 */
const CSS = fs.readFileSync(path.resolve(__dirname, '..', 'public', 'main.css'), 'utf-8');

/**
 * Function returning HTML string for our website
 * @param {object} helmet - react helmet
 * @param {object} reactBuild - react app rendered to string
 * @param {object} data - initial state data
 * @param {string} css - css
 *
 * @returns {string} compiled html
 */
const build = (helmet, reactBuild = null, data, css = CSS) => `<!doctype html><html><head>${helmet.title.toString()}${helmet.meta.toString()}<link rel="stylesheet" href="/public/main.css" /></head><body><div id="root">${reactBuild}</div><script src="/public/index.js" defer></script><script>__INITIAL__ = ${serialize(data, { isJSON: true })}</script></body></html>`;

/**
 * Function that resolves types of provided data
 * @param {object} data - given data
 * @returns {string} either single or collection
 */
const resolveType = (data) => {
  if (expect.objectToHave(data, 'posts')) {
    return COLLECTION;
  } else {
    return SINGLE;
  }
};

/**
 * Function that creates properly formatted data
 * @param {object} data - initial data
 * @returns {array} - always returns an array, either with one or many entries
 */
const createData = (data) => {
  if (resolveType(data) === COLLECTION) {
    return data.posts;
  } else {
    return [data];
  }
};

/**
 * Function for building initial state in shape of reducers
 * @param {string} url - initial url
 * @param {object} data - given data
 * @param {string|int} status - response status
 * @returns {object} initial state
 */
const buildInitialState = (url, data, status) => {
  const fetched = [];
  const pagination = {};
  const content = data === null ? [] : createData(data);

  for (const item of content) {
    fetched.push(item.url);
  }

  fetched.push(lastSlash(url));
  pagination[lastSlash(url)] = getPagination(url);

  return {
    Transitions: {
      status,
      loaded: true
    },
    Content: {
      content,
      fetched,
      search: { data: { count: 0 }, query: '' },
      pagination
    }
  }
};

/**
 * Function that generates the final response based on given params
 * @param {string} entry - entry url
 * @param {string} data - data provided by response
 * @param {function} res - function `res` passed by express
 * @param {string|int} [status=200] - response status
 *
 * @returns {undefined}
 */
const makeResponse = (entry, data, res, status = 200) => {
  const INITIAL = buildInitialState(entry, data, status);
  const STORE = makeStore(INITIAL);
  const BUILD = renderToString(<StaticRouter location={entry} context={{}}><Provider store={STORE}><App /></Provider></StaticRouter>);
  const HELMET = Helmet.renderStatic();

  res.send(build(HELMET, BUILD, STORE.getState()));
};

if (process.env.NODE_ENV === 'development') {
  /** HMR Start */
  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: '/public/'
  }));

  app.use(require('webpack-hot-middleware')(compiler));
  app.get(/.*.json/, (req, res) => { res.sendFile(path.join(__dirname, '..', req.url)) });
  /** HMR End */
}

app.use(compression());
app.use('/public', express.static(path.join(__dirname, '..', 'public')));

app.get('/api/cache/clear/:target?', (req, res) => {
  const target = typeof req.params.target === 'undefined' ? '/' : req.params.target;
  res.json(apicache.clear(target));
});

/**
 * Front-end api cache
 */
app.get('/api/*', CACHE(CACHE_TIME), (req, res) => {
  // const urlParam = req.params.url;
  const url = req.url.replace('/api','');
  const fetchUrl = `${API_URL}${url}`;

  axios.get(fetchUrl).then(r => {
    res.format({'application/json': () => {
      res.status(200).json(r.data);
    }})
  }).catch(() => {
    res.format({'application/json': () => {
      res.status(404).json(JSON.stringify({error: 404}));
    }})
  });
});

/**
 * Backend server
 */
app.get('/*', CACHE(CACHE_TIME), (req, res) => {
  const ENTRY_POINT = req.url;
  const URL = `${API_URL}${ENTRY_POINT}`;

  if (ENTRY_POINT.indexOf('hot-update.json') > -1) {
    res.sendFile(ENTRY_POINT);
  }

  axios.get(URL).then(r => {
    makeResponse(ENTRY_POINT, r.data, res);
  }).catch(e => {
    makeResponse('/error', null, res, e.response.status);
  })
});

app.listen(PORT, () => {
  console.log(process.env.NODE_ENV)
  console.log(`App is ready, listening on ${PORT}`);
});