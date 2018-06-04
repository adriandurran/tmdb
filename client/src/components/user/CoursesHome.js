import React from 'react';

import { Grid } from 'semantic-ui-react';

import CoursesSearch from '../courses/CoursesSearch';
import UserCoursesAdd from './UserCoursesAdd';

const CoursesHome = props => {
  return (
    <div>
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column>
            <CoursesSearch />
          </Grid.Column>
          <Grid.Column>
            <UserCoursesAdd />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>Users courses go in here</Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default CoursesHome;
