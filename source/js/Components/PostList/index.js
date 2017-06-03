import React from 'react';
import { connect } from 'react-redux';

import Card from '../../Containers/Card';

const PostList = ({ posts }) => <div>{posts.map(i => <Card key={i.id} link={i.url} title={i.title} />)}</div>;

const mapStateToProps = ({ Content }) => {
  return {
    posts: Content.content
  }
};

export default connect(mapStateToProps)(PostList);