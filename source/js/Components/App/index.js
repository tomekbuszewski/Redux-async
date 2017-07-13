import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Nav from '../../Containers/Nav';
import Section from '../../Containers/Section';

import Routes from '../Routes';
import Error from '../../Containers/Error';
import Container from '../../Containers/PageContainer';

const App = ({ status }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width" />
        {status !== 200 && <title>Błąd</title>}
      </Helmet>
      <Nav />
      <Container>
        {status !== 200 ? <Error /> : <Routes />}
      </Container>
    </div>
  );
};

const mapStateToProps = ({ Transitions }) => {
  return {
    status: Transitions.status
  }
};

export default withRouter(connect(mapStateToProps)(App));