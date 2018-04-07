import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchRoles } from '../actions/roles';
import { fetchComps } from '../actions/comps';

import {
  fetchCourses,
  fetchCourseTypes,
  fetchCourseLevels
} from '../actions/courses';

import Routes from '../Routes';

class App extends Component {
  componentDidMount() {
    const {
      fetchRoles,
      fetchCourses,
      fetchComps,
      fetchCourseLevels,
      fetchCourseTypes
    } = this.props;
    fetchRoles(); //this needs to change when we add authentication
    fetchCourses(); //this needs to change when we add authentication
    fetchComps(); //this needs to change when we add authentication
    fetchCourseLevels();
    fetchCourseTypes();
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
  fetchCourseTypes,
  fetchCourseLevels,
  fetchComps
};

export default connect(null, mapDispatchToProps)(App);
