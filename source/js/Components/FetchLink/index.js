import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { fetch } from '../../Actions/Content';

const FetchLink = ({ type = 'collection', href, fetch, children, history }) => {
  const go = () => { history.push(href) };

  return (
    <a href={href || ''} type={type} onClick={e => {
      e.preventDefault();
      fetch(href, type, go)
    }}>{children}</a>
  )
};

const mapStateToProps = ({ Content }) => {
  return {
    Content
  }
};

const mapDispatchToProps = {
  fetch: (url, type, cb) => fetch(url, type, cb)
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FetchLink));