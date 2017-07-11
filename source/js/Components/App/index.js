import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Nav from '../../Containers/Nav';
import Section from '../../Containers/Section';

import Routes from '../Routes';
import Error from '../../Containers/Error';

const App = ({ loaded, status }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width" />
        {status !== 200 && <title>Błąd</title>}
      </Helmet>
      <Nav />
      <div className={`wrapper ${loaded.loaded ? 'loaded' : 'loading'}`}>
        <Section>
          {status !== 200 ? <Error /> : <Routes />}
        </Section>
      </div>
    </div>
  );
};

const mapStateToProps = ({ Transitions }) => {
  return {
    loaded: Transitions,
    status: Transitions.status
  }
};

export default withRouter(connect(mapStateToProps)(App));