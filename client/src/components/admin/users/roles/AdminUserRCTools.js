import React, { Component } from 'react';

import { Grid, Header } from 'semantic-ui-react';

import AdminUserDetailsCard from '../AdminUserDetailsCard';
import AdminUserRoleManager from './AdminUserRoleManager';
import AdminUserComps from '../comps/AdminUserComps';

class AdminUserRCTools extends Component {
  render() {
    return (
      <div>
        <Grid>
          <Grid.Row columns={3}>
            <Grid.Column>
              <AdminUserDetailsCard />
            </Grid.Column>
            <Grid.Column>
              <Header as="h3" textAlign="center">
                Roles
              </Header>
              <AdminUserRoleManager />
            </Grid.Column>
            <Grid.Column>
              <Header as="h3" textAlign="center">
                Competencies
              </Header>
              <AdminUserComps />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>User courses go in here</Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default AdminUserRCTools;
