import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';

import Nav from '../../Containers/Nav';
import Section from '../../Containers/Section';

import PostList from '../PostList';
import Post from '../../Containers/Post';

import PaginationButton from '../Button/PaginationButton';

const Matcher = ({ match }) => {
  const { params, url } = match;
  const { any, slug } = params;
  const post = !(isNaN(any) && isNaN(slug));

  return post ? <Post url={match.url} /> : <PostList url={url} />
};

const App = ({ loaded }) => (
  <div className="page">
    <Nav />
    <div className={`wrapper ${loaded.loaded ? 'loaded' : 'loading'}`}>
      <Section>
        <Route exact path="/" render={() => <PostList url="/" />} />
        <Route path="/:any/:slug?/:inner?/:even?/:deeper?" component={Matcher} />
      </Section>
      <Section>
        <PaginationButton />
      </Section>
    </div>
  </div>
);

const mapStateToProps = ({ Transitions }) => {
  return { loaded: Transitions }
};

export default withRouter(connect(mapStateToProps)(App));