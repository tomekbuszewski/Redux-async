import React from 'react';
import { connect } from 'react-redux';

import style from './style.scss';

const ProgressBar = ({ loaded }) => <div className={`${style.bar} ${loaded ? style['bar--loaded'] : null}`} />;
const mapStateToProps = ({ Transitions }) => {
  return {
    loaded: Transitions.loaded
  }
};

export default connect(mapStateToProps)(ProgressBar);