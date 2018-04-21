import React, { Component } from 'react';
import { connect } from 'react-redux';

import 'semantic-ui-css/semantic.min.css';

import Routes from '../Routes';

import { fetchUser } from '../actions/auth';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <Routes />
      </div>
    );
  }
}

const mapDispatchToProps = {
  fetchUser
};

export default connect(null, mapDispatchToProps)(App);
