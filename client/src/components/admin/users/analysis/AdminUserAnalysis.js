import React from 'react';
import { Header, Grid } from 'semantic-ui-react';

import AdminUserRoleState from './AdminUserRoleState';

const AdminUserAnalysis = ({ user }) => {
  return (
    <>
      <Header as="h2" textAlign="center">
        User Analysis
      </Header>
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <AdminUserRoleState user={user} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

export default AdminUserAnalysis;
