import React from 'react';

import { Grid } from 'semantic-ui-react';

import RoleBuilder from './RoleBuilder';
import AdminRolesTable from './AdminRolesTable';
import AdminManagerMenu from '../shared/AdminManagerMenu';

const AdminRoleManager = props => {
  return (
    <div>
      <AdminManagerMenu />
      <Grid celled attached="bottom">
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
    </div>
  );
};

export default AdminRoleManager;
