import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetch } from '../../Actions/Content';

import Card from '../../Containers/Card';

class PostList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.fetched.indexOf(this.props.url) === -1) {
      this.props.fetch(this.props.url, 'collection');
    }
  }

  render() {
    return <div>{this.props.posts.map(i => <Card key={i.id} link={i.url} title={i.title} />)}</div>;
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(PostList);