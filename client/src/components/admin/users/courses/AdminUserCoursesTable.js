import React, { Component } from 'react';
import { connect } from 'react-redux';
// import _ from 'lodash';

import { Header } from 'semantic-ui-react';

import { fetchCourses } from '../../../../actions/courses';

class AdminUserCourseTable extends Component {
  componentDidMount() {
    this.props.fetchCourses();
  }

  render() {
    return (
      <div>
        <Header as="h3" textAlign="center">
          User Courses
        </Header>
      </div>
    );
  }
}

const mapDispatchToProps = {
  fetchCourses
};

AdminUserCourseTable = connect(
  null,
  mapDispatchToProps
)(AdminUserCourseTable);

export default AdminUserCourseTable;
