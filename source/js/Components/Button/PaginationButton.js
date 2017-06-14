import React from 'react';
import Button from './index';
import { connect } from 'react-redux';

import { fetch } from '../../Actions/Content';
import { lastSlash } from '../../Services/UrlParser';

const PaginationButton = ({ fetch, start = '' }) => <Button action={() => { fetch(`${lastSlash(start)}page/${next}/`, 'collection') }}>Pagination, {lastSlash(start)}</Button>;

const mapDispatchToProps = {
  fetch: (url, type) => fetch(url, type)
};

export default connect(null, mapDispatchToProps)(PaginationButton);