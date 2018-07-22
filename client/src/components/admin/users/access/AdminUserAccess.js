import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Header } from 'semantic-ui-react';

import AdminUserMenu from '../AdminUserMenu';
import AdminUserVerify from './AdminUserVerify';
import AdminUserAccessManage from './AdminUserAccessManage';
import AdminUsersAdmini from './AdminUsersAdmini';

import { fetchAllUsers } from '../../../../actions/user';
import { selectCurrentUser } from '../../../../reducers/selectors/userSelectors';

class AdminUserAccess extends Component {
  componentDidMount() {
    this.props.fetchAllUsers();
  }

  render() {
    const { user } = this.props;
    return (
      <div>
        <Header as="h2" textAlign="center">
          Manage User Access
        </Header>
        <AdminUserMenu />
        <Grid celled centered style={{ marginTop: '0.5em' }} attached="bottom">
          <Grid.Row>
            <Grid.Column>
              <AdminUserVerify />
            </Grid.Column>
          </Grid.Row>
          {/* {user.isSuperAdmin && ( */}
          <Grid.Row columns={2}>
            <Grid.Column>
              <AdminUserAccessManage />
            </Grid.Column>
            <Grid.Column>
              <AdminUsersAdmini />
            </Grid.Column>
          </Grid.Row>
          {/* )} */}
        </Grid>
      </div>
    );
  }
}

const mapDispatchToProps = {
  fetchAllUsers
};

const mapStateToProps = state => {
  return {
    user: selectCurrentUser(state)
  };
};

AdminUserAccess = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminUserAccess);

export default AdminUserAccess;
