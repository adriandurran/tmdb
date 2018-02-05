import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import _ from 'lodash';

class UserRoles extends Component {
  constructor(props) {
    super(props);
    this.props.fetchUserRoles(this.props.uroles);
  }

  componentDidUpdate() {}

  renderRoles() {
    return this.props.userRolly.map(urole => {
      return (
        <li className="collection-item" key={urole.roleId}>
          {urole.rolename}
        </li>
      );
    });
  }

  render() {
    return (
      <ul className="collection with-header blue-grey-text text-darken-1">
        <li className="collection-header">Roles</li>
        {this.renderRoles()}
      </ul>
    );
  }
}

function mapStateToProps({ roles }) {
  return {
    userRolly: _.filter(roles.fullRoles, x =>
      _.includes(roles.userRoles, x.roleId)
    )
  };
}

export default connect(mapStateToProps, actions)(UserRoles);
