import React from 'react';
import { connect } from 'react-redux';

const ProgressBar = ({ loaded }) => <div className={`progress-bar progress-bar--${loaded ? 'loaded' : 'loading'}`} />;

const mapStateToProps = ({ Transitions }) => {
  return {
    loaded: Transitions.loaded
  }
};

export default connect(mapStateToProps)(ProgressBar);