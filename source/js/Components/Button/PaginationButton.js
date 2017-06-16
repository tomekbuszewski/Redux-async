import React from 'react';
import Button from './index';
import { connect } from 'react-redux';

import expect from '../../Services/Expect';

import { fetch } from '../../Actions/Content';
import { lastSlash } from '../../Services/UrlParser';

const PaginationButton = ({ pagination, fetch, start = '' }) => {
  const next = expect.objectToHave(pagination, lastSlash(start)) ? pagination[lastSlash(start)] : Number('1');

  return next === false ? <div /> : <Button action={() => {
    fetch(`${lastSlash(start)}page/${Number(next) + 1}`, 'collection')
  }}>Pagination, {next + 1}</Button>;
};

const mapStateToProps = ({ Content }) => {
  return {
    pagination: Content.pagination
  }
};

const mapDispatchToProps = {
  fetch: (url, type) => fetch(url, type)
};

export default connect(mapStateToProps, mapDispatchToProps)(PaginationButton);