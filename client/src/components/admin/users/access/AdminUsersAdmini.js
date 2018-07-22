import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';

import { Item, Button, Header, Icon } from 'semantic-ui-react';

import { selectAllUsersAdmins } from '../../../../reducers/selectors/adminSelectors';
import { adminVerifyUser, adminAdminiUser } from '../../../../actions/user';

class AdminUsersAdmini extends Component {
  suspendUser = (e, { value }) => {
    this.props.adminVerifyUser(value, false);
  };

  adminiUser = (e, { value }) => {
    this.props.adminAdminiUser(value, false);
  };

  renderUserAdmins() {
    const { admins } = this.props;
    return admins.map(user => {
      return (
        <Item key={user._id}>
          <Item.Image size="tiny" src={user.imageUrl} />
          <Item.Content verticalAlign="middle">
            <Item.Header>
              {user.firstName} {user.lastName} &nbsp;
              {user.isSuperAdmin ? (
                <span>Super Admin</span>
              ) : (
                <span>Manager</span>
              )}
            </Item.Header>
            <Item.Meta>{user.userId}</Item.Meta>
            <Item.Meta>{user.username}</Item.Meta>
            <Item.Meta>
              Joined <Moment fromNow>{user.joinDate}</Moment>
            </Item.Meta>
            <Item.Extra>
              <Button onClick={this.adminiUser} value={user._id}>
                <Icon name="ban" color="red" />
                Demote
              </Button>
              <Button
                floated="right"
                onClick={this.suspendUser}
                value={user._id}
              >
                <Icon name="ban" color="red" />
                Suspend
              </Button>
            </Item.Extra>
          </Item.Content>
        </Item>
      );
    });
  }

  render() {
    return (
      <div>
        <Header as="h3" textAlign="center">
          Managers
        </Header>
        <Item.Group divided>{this.renderUserAdmins()}</Item.Group>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    admins: selectAllUsersAdmins(state)
  };
};

const mapDispatchToProps = {
  adminAdminiUser,
  adminVerifyUser
};

AdminUsersAdmini = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminUsersAdmini);

export default AdminUsersAdmini;
