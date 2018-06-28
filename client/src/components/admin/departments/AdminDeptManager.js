import React from 'react';

import { Header, Grid } from 'semantic-ui-react';

import AdminUserMenu from '../users/AdminUserMenu';
import AdminDeptAdd from './AdminDeptAdd';

const AdminDeptManager = () => {
  return (
    <div>
      <Header as="h2" textAlign="center">
        Departments
      </Header>
      <AdminUserMenu />
      <Grid
        celled
        columns={2}
        centered
        attached="bottom"
        style={{ marginTop: '0.5em' }}
      >
        <Grid.Column>
          <AdminDeptAdd />
        </Grid.Column>
        <Grid.Column>view delete dept</Grid.Column>
      </Grid>
    </div>
  );
};

export default AdminDeptManager;
