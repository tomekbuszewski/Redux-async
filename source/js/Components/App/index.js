import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../../Containers/Header';
import Section from '../../Containers/Section';

import PostList from '../PostList';

import PaginationButton from '../Button/PaginationButton'

import { toggle } from '../../Actions/Transitions';
import { fetch } from '../../Actions/Content';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetch('/', 'collection');
  }

  render() {
    return (
      <div>
        <Header variant={this.props.loading.loaded ? 'is-primary' : 'is-dark'} style="variant">Title</Header>
        <Section>
          <PostList/>
        </Section>
        <Section>
          <PaginationButton />
        </Section>
      </div>
    );
  }
}

const mapStateToProps = ({ Transitions }) => {
  return { loading: Transitions }
};

const mapDispatchToProps = {
  toggle: () => toggle(),
  fetch:  (url, type) => fetch(url, type)
};

export default connect(mapStateToProps, mapDispatchToProps)(App);