import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { Header, Grid } from 'semantic-ui-react';

import { fetchCourses } from '../../../../actions/courses';
import { selectUserManage } from '../../../../reducers/selectors/adminSelectors';

import AdminUserCoursesCurrent from './AdminUserCoursesCurrent';
import AdminUserCoursesVerify from './AdminUserCoursesVerify';
import AdminUserCoursesExpired from './AdminUserCoursesExpired';

class AdminUserCourseTable extends Component {
  componentDidMount() {
    this.props.fetchCourses();
  }

  render() {
    const { user } = this.props;
    if (_.isEmpty(user)) {
      return (
        <Header as="h3" textAlign="center">
          No User loaded
        </Header>
      );
    }
    return (
      <div>
        <Header as="h3" textAlign="center">
          User Courses
        </Header>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <AdminUserCoursesCurrent />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <AdminUserCoursesVerify />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <AdminUserCoursesExpired />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: selectUserManage(state)
  };
};

const mapDispatchToProps = {
  fetchCourses
};

AdminUserCourseTable = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminUserCourseTable);

export default AdminUserCourseTable;
