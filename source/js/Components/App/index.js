import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../Button';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <div><Button variant="is-primary">Children</Button></div>
        );
    }
}

export default connect()(App);