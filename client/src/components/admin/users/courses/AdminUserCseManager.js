import React from 'react';

import { Header, Grid } from 'semantic-ui-react';
import AdminUserMenu from '../AdminUserMenu';
import AdminUserCoursesManager from './AdminUserCoursesManager';

const AdminUserCseManager = () => {
  return (
    <div>
      <Header as="h2" textAlign="center">
        Courses waiting for Verification
      </Header>
      <AdminUserMenu />
      <Grid centered attached="bottom" style={{ marginTop: '0.5em' }}>
        <Grid.Column>
          <AdminUserCoursesManager />
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default AdminUserCseManager;
