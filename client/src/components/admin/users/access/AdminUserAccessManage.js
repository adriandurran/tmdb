import React, { Component } from 'react';

import { Header, Grid } from 'semantic-ui-react';

import AdminUserSearch from '../AdminUserSearch';
import AdminUserDetailsCard from '../AdminUserDetailsCard';

class AdminUserAccessManage extends Component {
  render() {
    return (
      <div>
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
      </div>
    );
  }
}

export default AdminUserAccessManage;
