import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { List, Icon, Button, Select } from 'semantic-ui-react';

import {
  selectUserManage,
  selectRolesForDropDown
} from '../../../../reducers/selectors';

import { addUserRole } from '../../../../actions/user';

class AdminUserRoleManager extends Component {
  deleteUserRole = (e, { value }) => {
    console.log(value);
  };

  addUserRole = (e, item) => {
    const { addUserRole, user } = this.props;
    addUserRole(item.value, user._id);
  };

  renderRoleSelect() {
    const { user, roles } = this.props;
    if (!_.isEmpty(user)) {
      return (
        <Select
          placeholder="Select Roles"
          options={roles}
          onChange={this.addUserRole}
        />
      );
    }
  }
  renderUserRoles() {
    const { user } = this.props;
    if (_.isEmpty(user)) {
      return <List.Content description="No User Roles" />;
    }
    if (user.roles.length === 0) {
      return <List.Content description="No User Roles" />;
    }
    return user.roles.map(role => {
      return (
        <List.Item key={role._id}>
          <List.Content floated="right">
            <Button icon onClick={this.deleteUserRole} value={role._id}>
              <Icon name="delete" />
            </Button>
          </List.Content>
          <List.Content>{role.roleName}</List.Content>
        </List.Item>
      );
    });
  }

  render() {
    const { roles } = this.props;
    return (
      <div>
        <List divided verticalAlign="middle">
          {this.renderUserRoles()}
        </List>
        {this.renderRoleSelect()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: selectUserManage(state),
    roles: selectRolesForDropDown(state)
  };
};

const mapDispatchToProps = {
  addUserRole
};

AdminUserRoleManager = connect(mapStateToProps, mapDispatchToProps)(
  AdminUserRoleManager
);

export default AdminUserRoleManager;
