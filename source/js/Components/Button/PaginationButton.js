import React from 'react';
import Button from './index';
import { connect } from 'react-redux';

import expect from '../../Services/Expect';

import { fetch } from '../../Actions/Content';
import { lastSlash } from '../../Services/UrlParser';

const PaginationButton = ({ pagination, fetch, start = '' }) => {
  const next = expect.objectToHave(pagination, start) ? Number(pagination[start]) : Number('1');

  return <Button action={() => {
    fetch(`${lastSlash(start)}page/${next + 1}`, 'collection')
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