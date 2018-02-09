import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import _ from 'lodash';

class UserRoles extends Component {
<<<<<<< HEAD
=======
  componentWillReceiveProps(nextProps) {
    if (this.props.uroles !== nextProps.uroles) {
      this.props.fetchUserRoles(nextProps.uroles);  
    }
  }

  componentDidUpdate() {}

>>>>>>> ad8e800780fa1fe134256048e7a7055e26db8436
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

function mapStateToProps({ roles }, ownProps) {
  return {
    userRolly: _.filter(roles.fullRoles, x =>
      _.includes(ownProps.uroles, x.roleId)
    )
  };
}

export default connect(mapStateToProps, actions)(UserRoles);
