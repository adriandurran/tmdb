import React from 'react';

import { Grid } from 'semantic-ui-react';

import RoleBuilder from './RoleBuilder';
import AdminRolesTable from './AdminRolesTable';

const AdminRoleManager = props => {
  return (
    <Grid celled>
      <Grid.Row>
        <Grid.Column>
          <RoleBuilder />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <AdminRolesTable />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default AdminRoleManager;
