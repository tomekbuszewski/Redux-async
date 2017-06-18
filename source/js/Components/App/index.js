import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Nav from '../../Containers/Nav';
import Section from '../../Containers/Section';

import PostList from '../PostList';
import Post from '../../Containers/Post';
import Error from '../../Containers/Error';

const Matcher = ({ match }) => {
  const { params, url } = match;
  const { any, slug } = params;
  const isPostList = typeof any === 'undefined' || (isNaN(Number(any)) && isNaN(Number(slug)));

  return isPostList ? <PostList url={url} /> : <Post url={url} />;
};

const App = ({ loaded }) => (
  <div className="page">
    <Helmet>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width" />
    </Helmet>
    <Nav />
    <div className={`wrapper ${loaded.loaded ? 'loaded' : 'loading'}`}>
      <Section>
        <Switch>
          <Route path="/error" exact component={Error} />
          <Route path="/:any?/:slug?/:inner?/:even?/:deeper?" component={Matcher} />
        </Switch>
      </Section>
    </div>
  </div>
);

const mapStateToProps = ({ Transitions }) => {
  return { loaded: Transitions }
};

export default withRouter(connect(mapStateToProps)(App));