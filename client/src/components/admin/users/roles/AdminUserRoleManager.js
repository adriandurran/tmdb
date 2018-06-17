import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { List, Icon, Button, Select } from 'semantic-ui-react';

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

  addUserRole = (e, item) => {
    const { editUserRole, user } = this.props;
    editUserRole(item.value, user._id, true);
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
  editUserRole,
  fetchRoles
};

AdminUserRoleManager = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminUserRoleManager);

export default AdminUserRoleManager;
