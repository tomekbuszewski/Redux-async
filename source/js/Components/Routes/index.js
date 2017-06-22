import React from 'react';
import { Route } from 'react-router-dom';

import PostList from '../PostList';
import Post from '../../Containers/Post';

const Matcher = ({ match }) => {
  const { params, url } = match;
  const { any, slug } = params;
  const isPostList = typeof any === 'undefined' || (isNaN(Number(any)) && isNaN(Number(slug)));

  return isPostList ? <PostList url={url} /> : <Post url={url} />
};

const Routes = () => <Route path="/:any?/:slug?/:inner?/:even?/:deeper?" component={Matcher} />;

export default Routes;