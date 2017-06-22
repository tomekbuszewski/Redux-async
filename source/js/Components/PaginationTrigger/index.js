import React from 'react';
import { connect } from 'react-redux';
import Waypoint from 'react-waypoint';

import expect from '../../Services/Expect';

import { fetch } from '../../Actions/Content';
import {
  lastSlash,
  createPaginationLink
} from '../../Services/UrlParser';
let oldWaypoint = 0;

const PaginationButton = ({ pagination, fetch, loaded, start = '' }) => {
  const next = expect.objectToHave(pagination, lastSlash(start)) ? pagination[lastSlash(start)] : Number('1');

  return !next || !loaded ? <div /> : <Waypoint onEnter={(p) => {
    if (oldWaypoint !== p.waypointBottom) {
      fetch(createPaginationLink(start, next + 1), 'collection');
      oldWaypoint = p.waypointBottom;
    }
  }} />
};

const mapStateToProps = ({ Content, Transitions }) => {
  return {
    loaded: Transitions.loaded,
    pagination: Content.pagination
  }
};

const mapDispatchToProps = {
  fetch: (url, type) => fetch(url, type)
};

export default connect(mapStateToProps, mapDispatchToProps)(PaginationButton);