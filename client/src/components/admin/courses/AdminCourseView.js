import React from 'react';

import { Header, Grid } from 'semantic-ui-react';

import AdminEditCourse from './AdminEditCourse';
import AdminCourseHolders from './AdminCourseHolders';

const AdminCourseView = () => {
  return (
    <div>
      <Header as="h2" textAlign="center">
        Course View
      </Header>
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
};

export default AdminCourseView;
