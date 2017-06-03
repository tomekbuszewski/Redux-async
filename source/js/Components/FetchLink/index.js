import React from 'react';
import { connect } from 'react-redux';

import { fetch } from '../../Actions/Content';

const FetchLink = ({ type = 'collection', href, fetch, children }) => <a href={href || ''} type={type} onClick={e => { e.preventDefault(); fetch(href, type) }}>{children}</a>;

const mapStateToProps = ({ Content }) => {
  return {
    Content
  }
};

const mapDispatchToProps = {
  fetch: (url, type) => fetch(url, type)
};

export default connect(mapStateToProps, mapDispatchToProps)(FetchLink);