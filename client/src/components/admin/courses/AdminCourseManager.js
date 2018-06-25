import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

import CourseBuilder from './CourseBuilder';
import AdminCoursesTable from './AdminCoursesTable';
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
              <AdminCoursesTable />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default AdminCourseManager;
