import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { Grid, Header } from 'semantic-ui-react';

import AdminUserMenu from '../AdminUserMenu';
import AdminUserSearch from '../AdminUserSearch';
import AdminUserRoleTools from './AdminUserRoleTools';

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
              <AdminUserRoleTools />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default AdminUserRoles;
