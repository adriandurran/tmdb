import React, { Component } from 'react';
import { connect } from 'react-redux';
// import _ from 'lodash';

import { Header, Table } from 'semantic-ui-react';

class AdminUserCourseTable extends Component {
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

export default AdminUserCourseTable;
