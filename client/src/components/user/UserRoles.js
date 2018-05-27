import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectUserRoleNames } from '../../reducers/selectors';
// dont need this selector now we are populating from the db......
import Toolbar from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';

let EnhancedListToolbar = () => {
  return (
    <Toolbar>
      <div style={{ flex: '0 0 auto' }}>
        <Typography variant="title">Roles</Typography>
      </div>
    </Toolbar>
  );
};

class UserRoles extends Component {
  renderRoles(roles) {
    return roles.map((role, index) => {
      return (
        <ListItem key={index} dense>
          <ListItemText primary={role.rolename} />
        </ListItem>
      );
    });
  }

  render() {
    return (
      <Paper>
        <EnhancedListToolbar />
        <List disablePadding>{this.renderRoles(this.props.userRoles)}</List>
      </Paper>
    );
  }
}

const mapStateToProps = state => {
  return {
    userRoles: selectUserRoleNames(state)
  };
};

export default connect(mapStateToProps)(UserRoles);
