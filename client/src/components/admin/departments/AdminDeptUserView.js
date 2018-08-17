import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Header, Grid, Breadcrumb, Card, Image } from 'semantic-ui-react';
import { isEmpty } from 'lodash';

import { roleUsers, noRoleUsers } from '../../../utils/roleHelpers';

import {
  selectUsersInDept,
  selectUniqueRolesInDept
} from '../../../reducers/selectors/adminSelectors';
import { selectDept } from '../../../reducers/selectors/deptSelectors';

class AdminDeptUserView extends Component {
  renderRoleColumns() {
    const { roles } = this.props;
    return roles.map((role) => {
      return (
        <Grid.Column key={role._id}>
          <Header as="h4" textAlign="center">
            {role.roleName}
          </Header>
          <Card.Group itemsPerRow={3} centered>
            {this.renderRoleUsers(role._id)}
          </Card.Group>
        </Grid.Column>
      );
    });
  }

  renderRoleUsers(roleId) {
    const { deptUsers } = this.props;
    const rUsers = roleUsers(deptUsers, roleId);
    return rUsers.map((user, index) => {
      return (
        <Card key={index} fluid>
          <Card.Content>
            <Image floated="right" size="mini" src={user.imageUrl} />
            <Card.Header>
              {user.firstName} {user.lastName}
            </Card.Header>
            <Card.Meta>{user.username}</Card.Meta>
            <Card.Description>
              Reserved for adding in Role competencies here (and status)
            </Card.Description>
          </Card.Content>
        </Card>
      );
    });
  }

  renderNoRoleUsers() {
    const { deptUsers } = this.props;
    const nrUsers = noRoleUsers(deptUsers);
    return nrUsers.map((user, index) => {
      return (
        <Card key={index} fluid>
          <Card.Content>
            <Image floated="right" size="mini" src={user.imageUrl} />
            <Card.Header>
              {user.firstName} {user.lastName}
            </Card.Header>
            <Card.Meta>{user.username}</Card.Meta>
            <Card.Description>
              Reserved for adding in Role competencies here (and status)
            </Card.Description>
          </Card.Content>
        </Card>
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
                {this.renderNoRoleUsers()}
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
