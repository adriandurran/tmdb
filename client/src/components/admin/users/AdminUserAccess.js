import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Header } from 'semantic-ui-react';

import AdminUserMenu from './AdminUserMenu';
import AdminUserVerify from './AdminUserVerify';

import { fetchAllUsers } from '../../../actions/user';

class AdminUserAccess extends Component {
  componentDidMount() {
    this.props.fetchAllUsers();
  }

  render() {
    return (
      <div>
        <Header as="h2" textAlign="center">
          Manage User Access
        </Header>
        <AdminUserMenu />
        <Grid celled centered style={{ marginTop: '0/5em' }} attached="bottom">
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

const mapDispatchToProps = {
  fetchAllUsers
};

AdminUserAccess = connect(null, mapDispatchToProps)(AdminUserAccess);

export default AdminUserAccess;
