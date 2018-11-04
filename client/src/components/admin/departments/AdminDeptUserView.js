import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Header, Grid, Breadcrumb, Card } from 'semantic-ui-react';
import { isEmpty } from 'lodash';

import { noRoleUsers } from '../../../utils/roleHelpers';

import {
  selectUsersInDept,
  selectUniqueRolesInDept
} from '../../../reducers/selectors/adminSelectors';
import { selectDept } from '../../../reducers/selectors/deptSelectors';

import AdminDeptRoleUsers from './AdminDeptRoleUsers';
import AdminDeptNoRoleUsers from './AdminDeptNoRoleUsers';

class AdminDeptUserView extends Component {
  renderRoleColumns() {
    const { roles } = this.props;
    return roles.map((role) => {
      return (
        <Grid.Column key={role._id}>
          <Header as="h5" textAlign="center">
            {role.roleName}
          </Header>
          <Card.Group itemsPerRow={3} centered>
            <AdminDeptRoleUsers roleId={role._id} />
          </Card.Group>
        </Grid.Column>
      );
    });
  }

  render() {
    const { dept, roles, deptUsers } = this.props;
    return (
      <div>
        <Header as="h2" textAlign="center">
          {dept.departmentName}
        </Header>
        <Breadcrumb style={{ marginBottom: '2em' }}>
          <Breadcrumb.Section link as={Link} to="/admin/dept-tools">
            Department Tools
          </Breadcrumb.Section>
          <Breadcrumb.Divider icon="right chevron" />
          <Breadcrumb.Section link as={Link} to="/admin/dept-views">
            Department Views
          </Breadcrumb.Section>
          <Breadcrumb.Divider icon="right arrow" />
          <Breadcrumb.Section active>
            {isEmpty(dept)
              ? 'No Department found'
              : `Details for ${dept.departmentName}`}
          </Breadcrumb.Section>
        </Breadcrumb>
        {deptUsers.length > 0 ? (
          <Grid celled centered>
            {roles.length > 0 && (
              <Grid.Row columns={roles.length}>
                <Header
                  as="h4"
                  textAlign="center"
                  style={{ marginTop: '0.5em' }}
                >
                  Roles
                </Header>
                {this.renderRoleColumns()}
              </Grid.Row>
            )}
          </Grid>
        ) : (
          <Header as="h5" textAlign="center">
            No users in this department
          </Header>
        )}
        {noRoleUsers(deptUsers).length > 0 && (
          <Grid celled centered>
            <Grid.Column>
              <Header as="h5" textAlign="center">
                Users with no Roles
              </Header>
              <Card.Group itemsPerRow={4} centered>
                <AdminDeptNoRoleUsers />
              </Card.Group>
            </Grid.Column>
          </Grid>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    deptUsers: selectUsersInDept(state),
    dept: selectDept(state),
    roles: selectUniqueRolesInDept(state)
  };
};

AdminDeptUserView = connect(mapStateToProps)(AdminDeptUserView);

export default AdminDeptUserView;
