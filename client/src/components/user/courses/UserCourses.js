import React from 'react';

import { Header, Grid } from 'semantic-ui-react';

import UserCoursesCurrent from './UserCoursesCurrent';
import UserCoursesVerify from './UserCoursesVerify';
import UserCoursesExpired from './UserCoursesExpired';

const UserCourses = () => {
  return (
    <div>
      <Header as="h2" textAlign="center">
        Courses
      </Header>
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <UserCoursesCurrent />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <UserCoursesVerify />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <UserCoursesExpired />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default UserCourses;
