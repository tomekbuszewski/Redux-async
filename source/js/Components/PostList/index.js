import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { onlyUpdateForKeys } from 'recompose';

import { fetch } from '../../Actions/Content';

import List from './ListContainer';
import Pagination from '../PaginationTrigger';

const PostList = ({ posts, url, title = 'Strona główna', withPagination = true }) => {
  return (
    <div>
      {title && <Helmet><title>{title}</title></Helmet>}
      <List posts={posts} url={url} />
      {withPagination && <Pagination start={url} />}
    </div>
  );
}

const mapStateToProps = ({ Content }) => {
  return {
    fetched: Content.fetched,
    posts: Content.content
  }
};

const mapDispatchToProps = {
  fetch: (url, type) => fetch(url, type)
};

export default onlyUpdateForKeys(['posts', 'url'])(connect(mapStateToProps, mapDispatchToProps)(PostList));