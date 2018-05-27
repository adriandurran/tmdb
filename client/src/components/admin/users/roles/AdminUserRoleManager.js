import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { List, Icon, Button } from 'semantic-ui-react';

import { selectUserManage } from '../../../../reducers/selectors';

class AdminUserRoleManager extends Component {
  deleteRole = (e, { value }) => {
    console.log(value);
  };

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
            <Button icon onClick={this.deleteRole} value={role._id}>
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
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: selectUserManage(state)
  };
};

AdminUserRoleManager = connect(mapStateToProps)(AdminUserRoleManager);

export default AdminUserRoleManager;
