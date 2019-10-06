import React from 'react';
import { Grid, Header } from 'semantic-ui-react';

import AdminUserVerify from './AdminUserVerify';
import AdminUserAccessManage from './AdminUserAccessManage';
import AdminUsersAdmini from './AdminUsersAdmini';

const AdminUserAccess = () => {
  return (
    <>
      <Header as="h2" textAlign="center">
        Manage User Access
      </Header>
      <Grid celled centered style={{ marginTop: '0.5em' }} attached="bottom">
        <Grid.Row columns={3}>
          <Grid.Column>
            <AdminUserVerify />
          </Grid.Column>
          <Grid.Column>
            <AdminUserAccessManage />
          </Grid.Column>
          <Grid.Column>
            <AdminUsersAdmini />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

export default AdminUserAccess;
