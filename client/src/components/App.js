import React, { Component } from 'react';
import { connect } from 'react-redux';

import 'semantic-ui-css/semantic.min.css';
import '../styles/styles.css';

import Layout from '../Layout';

import { fetchUser } from '../actions/auth';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return <Layout />;
  }
}

const mapDispatchToProps = {
  fetchUser
};

export default connect(
  null,
  mapDispatchToProps
)(App);
