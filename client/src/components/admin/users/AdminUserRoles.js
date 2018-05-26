import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { Grid, Header } from 'semantic-ui-react';

import AdminUserMenu from './AdminUserMenu';
import AdminUserSearch from './AdminUserSearch';
import AdminUserRoleManager from './AdminUserRoleManager';

class AdminUserRoles extends Component {
  render() {
    return (
      <div>
        <Header as="h2" textAlign="center">
          Manage User Roles
        </Header>
        <AdminUserMenu />
        <Grid celled centered style={{ marginTop: '0/5em' }} attached="bottom">
          <Grid.Row>
            <Grid.Column>
              <AdminUserSearch />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <AdminUserRoleManager />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default AdminUserRoles;
