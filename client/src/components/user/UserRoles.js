import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectUserRoleNames } from '../../reducers/selectors';

// import { withStyles } from 'material-ui/styles';
// import { withTheme } from 'material-ui/styles';
import withRoot from '../../withRoot';
// import rootStyles from '../../styles/rootStyle';

import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

class UserRoles extends Component {
  renderRoles(roles) {
    return roles.map(role => {
      return (
        <ListItem key={role.roleId} dense>
          <ListItemText primary={role.rolename} />
        </ListItem>
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Roles</h3>
        <List disablePadding>{this.renderRoles(this.props.userRoles)}</List>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userRoles: selectUserRoleNames(state)
  };
};

// UserRoles = withStyles(rootStyles)(UserRoles);
// UserRoles = withTheme()(UserRoles);

export default withRoot(connect(mapStateToProps)(UserRoles));
