import React from 'react';

import { Header, Grid } from 'semantic-ui-react';

import AdminUserSearch from '../AdminUserSearch';
import AdminUserDetailsCard from '../AdminUserDetailsCard';

const AdminUserAccessManage = () => {
  return (
    <>
      <Header as="h3" textAlign="center">
        Manage Access
      </Header>
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <AdminUserSearch />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <AdminUserDetailsCard />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

export default AdminUserAccessManage;
