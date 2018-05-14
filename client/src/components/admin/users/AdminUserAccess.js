import React, { Component } from 'react';

import { Grid, Header } from 'semantic-ui-react';

import AdminUserVerify from './AdminUserVerify';

class AdminUserAccess extends Component {
  render() {
    return (
      <div>
        <Header as="h2" textAlign="center">
          Manage User Access
        </Header>
        <Grid celled centered style={{ marginTop: '0/5em' }}>
          <Grid.Row>
            <Grid.Column>
              <AdminUserVerify />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default AdminUserAccess;
