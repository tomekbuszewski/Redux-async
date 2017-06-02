import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../../Containers/Header';
import Section from '../../Containers/Section';
import Link from '../FetchLink';

import { toggle } from '../../Actions/Transitions';
import { fetch } from '../../Actions/Content';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header variant={this.props.loading.loaded ? 'is-primary' : 'is-dark'} style="variant">Title</Header>
        <Section>
          <Link type="post" href="/2017/04/witaj-swiecie/">Witaj świecie</Link>
          <br />
          <Link href="/">Pierwsza strona</Link>
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
  fetch:  url => fetch(url)
};

export default connect(mapStateToProps, mapDispatchToProps)(App);