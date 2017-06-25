import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { fetch } from '../../Actions/Content';

const FetchLink = ({ type = 'collection', href, fetch, children, history, classname }) => {
  const go = () => { history.push(href) };

  return (
    <a className={classname} href={href || ''} type={type} onClick={e => {
      e.preventDefault();
      fetch(href, type, go)
    }}>{children}</a>
  )
};

FetchLink.PropTypes = {
  type: PropTypes.oneOf(['collection', 'post'])
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