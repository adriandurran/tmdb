import React from 'react';

import { Header, Grid } from 'semantic-ui-react';

import AdminUserMenu from '../users/AdminUserMenu';
import AdminDeptAdd from './AdminDeptAdd';
import AdminDeptList from './AdminDeptList';
import AdminUsersNoDeptTable from '../users/dept/AdminUsersNoDeptTable';

const AdminDeptManager = () => {
  return (
    <div>
      <Header as="h2" textAlign="center">
        Departments
      </Header>
      <AdminUserMenu />
      <Grid celled centered attached="bottom" style={{ marginTop: '0.5em' }}>
        <Grid.Row columns={2}>
          <Grid.Column>
            <AdminDeptAdd />
          </Grid.Column>
          <Grid.Column>
            <AdminDeptList />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <AdminUsersNoDeptTable />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default AdminDeptManager;
