import React from 'react';
import Button from './index';
import { connect } from 'react-redux';

import { fetch } from '../../Actions/Content';

const PaginationButton = ({ next, fetch }) => <Button action={() => { fetch(`/page/${next}/`, 'collection') }}>Pagination, {next}</Button>;

const mapStateToProps = ({ Content }) => {
  return {
    next: Content.nextPage
  }
};

const mapDispatchToProps = {
  fetch: (url, type) => fetch(url, type)
};

export default connect(mapStateToProps, mapDispatchToProps)(PaginationButton);