import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchRoles, fetchCourses, fetchComps } from '../actions';

import Routes from '../Routes';

class App extends Component {
  componentDidMount() {
    const { fetchRoles, fetchCourses, fetchComps } = this.props;
    fetchRoles(); //this needs to change when we add authentication
    fetchCourses(); //this needs to change when we add authentication
    fetchComps(); //this needs to change when we add authentication
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
  fetchRoles,
  fetchCourses,
  fetchComps
};

export default connect(null, mapDispatchToProps)(App);
