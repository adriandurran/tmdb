import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { Header, Grid, Breadcrumb } from 'semantic-ui-react';

import { selectCourse } from '../../../reducers/selectors/courseSelectors';

import AdminEditCourse from './AdminEditCourse';
import AdminCourseHolders from './AdminCourseHolders';

class AdminCourseView extends Component {
  render() {
    const { course } = this.props;
    return (
      <div>
        <Header as="h2" textAlign="center">
          Course View
        </Header>
        <Breadcrumb style={{ marginBottom: '2em' }}>
          <Breadcrumb.Section link as={Link} to="/admin/dashboard">
            Admin Dashboard
          </Breadcrumb.Section>
          <Breadcrumb.Divider icon="right chevron" />
          <Breadcrumb.Section link as={Link} to="/admin/course-manager">
            Course Manager
          </Breadcrumb.Section>
          <Breadcrumb.Divider icon="right arrow" />
          <Breadcrumb.Section active>
            {_.isEmpty(course)
              ? 'No Course found'
              : `Details for ${course.courseName}`}
          </Breadcrumb.Section>
        </Breadcrumb>
        <Grid columns={2} centered>
          <Grid.Column>
            <AdminEditCourse />
          </Grid.Column>
          <Grid.Column>
            <AdminCourseHolders />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    course: selectCourse(state)
  };
};

AdminCourseView = connect(mapStateToProps)(AdminCourseView);

export default AdminCourseView;
