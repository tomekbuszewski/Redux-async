import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from '../../Containers/Header';
import Section from '../../Containers/Section';

import PostList from '../PostList';
import Post from '../../Containers/Post';

import PaginationButton from '../Button/PaginationButton'

const Matcher = ({ match }) => {
  const { params } = match;
  const { any, slug } = params;
  const post = !(isNaN(any) && isNaN(slug));

  return post ? <Post url={match.url} /> : <div />
};

const App = ({ loading }) => (
  <Router>
    <div>
      <Header variant={loading.loaded ? 'is-primary' : 'is-dark'} style="variant">Title</Header>
      <Section>
        <Route exact path="/" render={() => <PostList url="/" />} />
        <Route path="/:any/:slug?/:inner?/:even?/:deeper?" component={Matcher} />
      </Section>
      <Section>
        <PaginationButton />
      </Section>
    </div>
  </Router>
);

const mapStateToProps = ({ Transitions }) => {
  return { loading: Transitions }
};

export default connect(mapStateToProps)(App);