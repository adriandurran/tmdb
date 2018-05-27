import React, { Component } from 'react';

import { Grid } from 'semantic-ui-react';

import AdminUserDetailsCard from '../AdminUserDetailsCard';
import AdminUserRoleManager from './AdminUserRoleManager';

class AdminUserRoleTools extends Component {
  render() {
    return (
      <div>
        <Grid columns={2}>
          <Grid.Column>
            <AdminUserDetailsCard />
          </Grid.Column>
          <Grid.Column>
            <AdminUserRoleManager />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default AdminUserRoleTools;
