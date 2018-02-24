import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectUserRoleNames } from '../../reducers/selectors';

import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

class UserRoles extends Component {
  renderRoles(roles) {
    return roles.map(role => {
      return (
        <ListItem>
          <ListItemText primary={role.rolename} />
        </ListItem>
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Roles</h3>
        <List>
          {this.renderRoles(this.props.userRoles)}
        </List>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userRoles: selectUserRoleNames(state)
  };
};

export default connect(mapStateToProps)(UserRoles);
