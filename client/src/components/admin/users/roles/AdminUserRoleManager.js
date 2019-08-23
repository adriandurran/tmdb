import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { format, parseISO, toDate } from 'date-fns';

import { List, Icon, Button, Select, Header } from 'semantic-ui-react';

import { selectRolesForDropDown } from '../../../../reducers/selectors/roleSelectors';
import { selectUserManage } from '../../../../reducers/selectors/adminSelectors';

import { editUserRole } from '../../../../actions/user';
import { fetchRoles } from '../../../../actions/roles';

class AdminUserRoleManager extends Component {
  componentDidMount() {
    this.props.fetchRoles();
  }

  deleteUserRole = (e, { value }) => {
    const { user, editUserRole } = this.props;
    editUserRole(value, user._id, false);
  };

  addUserRole = (e, { value }) => {
    const { editUserRole, user } = this.props;
    const newRole = {
      _role: value,
      joinDate: Date.now()
    };
    editUserRole(newRole, user._id, true);
  };

  render() {
    const { user, roles } = this.props;
    return (
      <>
        {!isEmpty(user) && (
          <>
            <Header as="h3" textAlign="center">
              Roles
            </Header>
            <List divided verticalAlign="middle">
              {user.roles.map((role) => {
                console.log(role);
                const { _id, roleName } = role._role;
                return (
                  <List.Item key={_id}>
                    <List.Content floated="right">
                      <Button icon onClick={this.deleteUserRole} value={_id}>
                        <Icon name="delete" />
                      </Button>
                    </List.Content>
                    <List.Header>{roleName}</List.Header>
                    <List.Description>
                      Assigned on{' '}
                      {format(parseISO(role.joinDate), 'dd MMM yyyy')}
                    </List.Description>
                  </List.Item>
                );
              })}
            </List>

            <Select
              placeholder="Select Roles"
              options={roles}
              onChange={this.addUserRole}
            />
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: selectUserManage(state),
    roles: selectRolesForDropDown(state)
  };
};

const mapDispatchToProps = {
  editUserRole,
  fetchRoles
};

AdminUserRoleManager = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminUserRoleManager);

export default AdminUserRoleManager;
