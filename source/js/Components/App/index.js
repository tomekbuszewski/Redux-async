import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../Button';
import Header from '../../Containers/Header';
import Section from '../../Containers/Section';

import { toggle } from '../../Actions/Transitions';
import { fetch } from '../../Actions/Content';

class App extends Component {
    constructor(props) {
        super(props);

        this.fetch = this.props.fetch.bind(this);
    }

    render() {
        return (
          <div>
            <Header variant={this.props.loading.loaded ? 'is-primary' : 'is-dark'} style="variant">Title</Header>
            <Section>
              <Button action={this.props.toggle}>Toggle</Button>
              <Button action={() => { this.fetch('/2017/04/witaj-swiecie/') }}>Fetch post</Button>
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
  fetch: url => fetch(url)
};

export default connect(mapStateToProps, mapDispatchToProps)(App);