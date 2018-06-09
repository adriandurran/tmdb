import React, { Component } from 'react';

import { Header, Grid } from 'semantic-ui-react';

import UserCoursesCurrent from './UserCoursesCurrent';
import UserCoursesVerify from './UserCoursesVerify';

class UserCourses extends Component {
  render() {
    return (
      <div>
        <Header as="h3" textAlign="center">
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
        </Grid>
      </div>
    );
  }
}

export default UserCourses;
