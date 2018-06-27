import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { Header, Grid, Breadcrumb } from 'semantic-ui-react';

import { selectRole } from '../../../reducers/selectors/roleSelectors';

import AdminEditRole from './AdminEditRole';
import AdminRoleHolders from './AdminRoleHolders';

class AdminRoleView extends Component {
  render() {
    const { role } = this.props;
    return (
      <div>
        <Header as="h2" textAlign="center">
          Role View
        </Header>
        <Breadcrumb style={{ marginBottom: '2em' }}>
          <Breadcrumb.Section link as={Link} to="/admin/dashboard">
            Admin Dashboard
          </Breadcrumb.Section>
          <Breadcrumb.Divider icon="right chevron" />
          <Breadcrumb.Section link as={Link} to="/admin/role-manager">
            Role Manager
          </Breadcrumb.Section>
          <Breadcrumb.Divider icon="right arrow" />
          <Breadcrumb.Section active>
            {_.isEmpty(role) ? 'No Role found' : `Details for ${role.roleName}`}
          </Breadcrumb.Section>
        </Breadcrumb>
        <Grid columns={2} centered>
          <Grid.Column>
            <Grid.Column>
              <AdminEditRole />
            </Grid.Column>
          </Grid.Column>
          <Grid.Column>
            <AdminRoleHolders />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    role: selectRole(state)
  };
};

AdminRoleView = connect(mapStateToProps)(AdminRoleView);

export default AdminRoleView;
