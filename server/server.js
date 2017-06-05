// import React from 'react';
// import { renderToString } from 'react-dom/server';
import express from 'express';
import axios from 'axios';
import serialize from 'serialize-javascript';
// import { createStore } from 'redux';

import expect from '../source/js/Services/Expect';

import { API_URL } from '../source/config';

import { makeStore } from '../source/js/Utils/store';

const app = express();
const PORT = 1199;
const COLLECTION = 'COLLECTION';
const SINGLE = 'SINGLE';

const build = (data) => `<!doctype html><html><head></head><body><div id="#root"></div><script>__INITIAL__ = ${serialize(data, { isJSON: true })}</script></body></html>`;
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
const buildInitialState = (url, data) => {
  return {
    Transitions: {
      loaded: true
    },
    Content: {
      content: createData(data),
      fetched: [url]
    }
  }
};

app.get('/*', (req, res) => {
  const ENTRY_POINT = req.url;
  const URL = `${API_URL}${ENTRY_POINT}`;

  axios.get(URL).then(r => {
    const INITIAL = buildInitialState(ENTRY_POINT, r.data);
    const STORE = makeStore(INITIAL);

    res.send(build(STORE.getState()));
  })
});

app.listen(PORT, () => {
  console.log(`App is ready, listening on ${PORT}`);
});