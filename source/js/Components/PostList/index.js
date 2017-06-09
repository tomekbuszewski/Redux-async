import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import { fetch } from '../../Actions/Content';
import { getLastPart } from '../../Services/UrlParser';
// import findObject from '../../Services/FindObject';
import { orderByCriteria, filterByCriteria } from '../../Services/Database';

import Card from '../../Containers/Card';

class PostList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: getLastPart(this.props.url)
    };
  }

  componentDidMount() {
    if (this.props.fetched.indexOf(this.props.url) === -1) {
      this.props.fetch(this.props.url, 'collection');
    }
  }

  render() {
    return <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Strona główna</title>
      </Helmet>
      {orderByCriteria(filterByCriteria(this.props.posts, 'categories', 'slug', this.state.filter), 'date').map(i => <Card key={i.id} link={i.url} title={i.title} />)}
      </div>;
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