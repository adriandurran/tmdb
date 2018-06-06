import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

import CourseBuilder from './CourseBuilder';
import CoursesTable from '../../courses/CoursesTable';
import AdminCoursesMenu from './AdminCoursesMenu';

class AdminCourseManager extends Component {
  render() {
    return (
      <div>
        <AdminCoursesMenu />
        <Grid celled attached="bottom">
          <Grid.Row>
            <Grid.Column>
              <CourseBuilder />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <CoursesTable />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default AdminCourseManager;
