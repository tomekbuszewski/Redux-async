import React from 'react';
import { renderToString } from 'react-dom/server';
import express from 'express';
import axios from 'axios';
import serialize from 'serialize-javascript';
import path from 'path';
import compression from 'compression';
import fs from 'fs';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { Helmet } from 'react-helmet';

import expect from '../source/js/Services/Expect';
import { getPagination, lastSlash } from '../source/js/Services/UrlParser';
import cache from './cache';

import { API_URL } from '../source/config';
import { makeStore } from '../source/js/Utils/store';
import App from '../source/js/Components/App';

const app = express();
const PORT = 1199;
const COLLECTION = 'COLLECTION';
const SINGLE = 'SINGLE';

const CSS = fs.readFileSync(path.resolve(__dirname, '..', 'public', 'main.css'), 'utf-8');

const build = (helmet, reactBuild = null, data, css = CSS) => `<!doctype html><html><head>${helmet.title.toString()}${helmet.meta.toString()}<link rel="stylesheet" href="/public/main.css" /></head><body><div id="root">${reactBuild}</div><script src="/public/index.js" defer></script><script>__INITIAL__ = ${serialize(data, { isJSON: true })}</script></body></html>`;
const resolveType = (data) => {
  if (expect.objectToHave(data, 'posts')) {
    return COLLECTION;
  } else {
    return SINGLE;
  }
};
const createData = (data) => {
  if (resolveType(data) === COLLECTION) {
    return data.posts;
  } else {
    return [data];
  }
};
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
      pagination
    }
  }
};

const makeResponse = (entry, data, res, status = 200) => {
  const INITIAL = buildInitialState(entry, data, status);
  const STORE = makeStore(INITIAL);
  const BUILD = renderToString(<StaticRouter location={entry} context={{}}><Provider store={STORE}><App /></Provider></StaticRouter>);
  const HELMET = Helmet.renderStatic();

  res.send(build(HELMET, BUILD, STORE.getState()));
};

app.use(compression());
app.use('/public', express.static(path.join(__dirname, '..', 'public')));

app.get('/*', cache(10), (req, res) => {
  const ENTRY_POINT = req.url;
  const URL = `${API_URL}${ENTRY_POINT}`;

  axios.get(URL).then(r => {
    makeResponse(ENTRY_POINT, r.data, res);
  }).catch(e => {
    makeResponse('/error', null, res, e.response.status);
  })
});

app.listen(PORT, () => {
  console.log(`App is ready, listening on ${PORT}`);
});