import React from 'react';

import { Header, Grid } from 'semantic-ui-react';

import AdminDeptAdd from './AdminDeptAdd';
import AdminDeptList from './AdminDeptList';
import AdminDeptMenu from './AdminDeptMenu';

const AdminDeptManager = () => {
  return (
    <div>
      <Header as="h2" textAlign="center">
        Department Manager
      </Header>
      <AdminDeptMenu />
      <Grid celled centered attached="bottom" style={{ marginTop: '0.5em' }}>
        <Grid.Row columns={2}>
          <Grid.Column>
            <AdminDeptAdd />
          </Grid.Column>
          <Grid.Column>
            <AdminDeptList />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default AdminDeptManager;
