import React from 'react';
import { Grid } from 'semantic-ui-react';

import CourseBuilder from './CourseBuilder';
import CoursesTable from '../../courses/coursesTable';

const AdminCourseManager = props => {
  return (
    <Grid celled>
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
  );
};

export default AdminCourseManager;
