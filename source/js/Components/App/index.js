import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import Header from '../../Containers/Header';
import Section from '../../Containers/Section';

import Link from '../FetchLink';

import PostList from '../PostList';
import Post from '../../Containers/Post';

import PaginationButton from '../Button/PaginationButton';

const Matcher = ({ match }) => {
  const { params } = match;
  const { any, slug } = params;
  const post = !(isNaN(any) && isNaN(slug));

  return post ? <Post url={match.url} /> : <div />
};

const App = ({ loaded }) => (
  <div className={`page ${loaded.loaded ? 'loaded' : 'loading'}`}>
    <Header>Title, <Link href="/">Index</Link></Header>
    <Section>
      <Route exact path="/" render={() => <PostList url="/" />} />
      <Route path="/:any/:slug?/:inner?/:even?/:deeper?" component={Matcher} />
    </Section>
    <Section>
      <PaginationButton />
    </Section>
  </div>
);

const mapStateToProps = ({ Transitions }) => {
  return { loaded: Transitions }
};

export default connect(mapStateToProps)(App);