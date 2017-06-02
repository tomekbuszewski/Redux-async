import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetch } from '../../Actions/Content';

class FetchLink extends Component {
  /**
   * Component for providing fetching content before routing takes place
   * @param {object} props - given props
   * @constructor
   */
  constructor(props) {
    super(props);

    this.click = this._handleClick.bind(this);
  }

  static get defaultProps() {
    return {
      type: 'collection'
    }
  }

  _handleClick(e) {
    e.preventDefault();

    this.props.fetch(this.props.href, this.props.type);
  }

  render() {
    return <a href={this.props.href || ''} onClick={this.click}>{this.props.children}</a>
  }
}

const mapStateToProps = ({ Content }) => {
  return {
    Content
  }
};

const mapDispatchToProps = {
  fetch: (url, type) => fetch(url, type)
};

export default connect(mapStateToProps, mapDispatchToProps)(FetchLink);