import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import { fetch } from '../../Actions/Content';
import { getLastPart, getType } from '../../Services/UrlParser';
import { orderByCriteria, filterByCriteria } from '../../Services/Database';

import Card from '../../Containers/Card';

class PostList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: getLastPart(this.props.url),
      type: 'categories'
    };
  }

  componentDidMount() {
    if (this.props.fetched.indexOf(this.props.url) === -1) {
      this.props.fetch(this.props.url, 'collection');
    }

    this.setState({
      filter: getLastPart(this.props.url),
      type: getType(this.props.url)
    });
  }

  componentWillReceiveProps(p) {
    if (p.url !== this.props.url) {
      this.setState({
        filter: getLastPart(p.url),
        type: getType(p.url)
      })
    }
  }

  render() {
    return <div>
      <Helmet>
        <title>Strona główna</title>
      </Helmet>
      {orderByCriteria(filterByCriteria(this.props.posts, this.state.type, 'slug', this.state.filter), 'date').map(i => <Card key={i.id} link={i.url} title={i.title} />)}
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