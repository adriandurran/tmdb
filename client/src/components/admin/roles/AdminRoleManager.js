import React from 'react';

import { Grid } from 'semantic-ui-react';

import RoleBuilder from './RoleBuilder';
import Roles from '../../roles/roles';

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
          <Roles />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default AdminRoleManager;
