import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { getPost } from '../../Services/Database';

export const Post = (props) => {
  const { url, posts } = props;
  const post = getPost(posts, 'url', url);

  return <div className="content">
    <Helmet>
      <title>{post.title}</title>
    </Helmet>
    <h2 className="title is-2">{post.title}</h2>
    <div dangerouslySetInnerHTML={{ __html: post.content }} />
  </div>
};

const mapStateToProps = ({ Content }) => {
  return {
    posts: Content.content
  }
};

export default connect(mapStateToProps)(Post);