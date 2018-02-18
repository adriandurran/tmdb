import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectUserRoleNames } from '../../reducers/selectors';

class UserRoles extends Component {
  renderRoles(roles) {
    return roles.map(role => {
      return (
        <li className="collection-item" key={role.roleId}>
          {role.rolename}
        </li>
      );
    });
  }

  render() {
    const { userRoles } = this.props;
    return (
      <ul className="collection with-header blue-grey-text text-darken-1">
        <li className="collection-header">Roles</li>
        {this.renderRoles(userRoles)}
      </ul>
    );
  }
}

const mapStateToProps = state => {
  return {
    userRoles: selectUserRoleNames(state)
  };
};

export default connect(mapStateToProps)(UserRoles);
