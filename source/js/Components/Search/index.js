import React, { Component } from 'react';
import { connect } from 'react-redux';
import DebounceInput from 'react-debounce-input';

import { search } from '../../Actions/Content';

import Link from '../FetchLink';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: ''
    };

    this.searchQuery = this._searchQuery.bind(this);
  }

  _searchQuery(e) {
    const query = e.target.value;
    this.props.search(query);
  }

  render() {
    return <div>
      <DebounceInput minLength={3} value={this.props.query} debounceTimeout={500} onChange={this.searchQuery} />
      <div>
        {this.props.count}
        {this.props.count > 0 ? <ol>{this.props.results.map(i => <li key={`search-${i.id}`}><Link href={i.url} type="post">{i.title}</Link></li>)}</ol> : ''}
      </div>
    </div>
  }
}

const mapStateToProps = ({ Content }) => {
  return {
    count: Content.search.data.count,
    results: Content.search.data.posts,
    query: Content.search.query
  }
};

const mapDispatchToProps = {
  search: (query) => search(query)
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);