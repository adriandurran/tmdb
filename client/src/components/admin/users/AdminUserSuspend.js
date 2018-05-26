import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Item, Button, Header, Icon } from 'semantic-ui-react';

import { selectAllUsersActive } from '../../../reducers/selectors';
import { adminVerifyUser, adminAdminiUser } from '../../../actions/user';

class AdminUserSuspend extends Component {
  suspendUser = (e, { value }) => {
    this.props.adminVerifyUser(value, false);
  };

  adminiUser = (e, { value }) => {
    this.props.adminAdminiUser(value, true);
  };

  renderUserSuspend() {
    const { active } = this.props;
    return active.map(user => {
      return (
        <Item key={user._id}>
          <Item.Content verticalAlign="middle">
            <Item.Header>
              {user.firstName} {user.lastName}
            </Item.Header>
            <Item.Meta>{user.userId}</Item.Meta>
            <Item.Meta>{user.username}</Item.Meta>
            <Item.Extra>
              <Button
                animated="vertical"
                onClick={this.adminiUser}
                value={user._id}
              >
                <Button.Content hidden>Admin</Button.Content>
                <Button.Content visible>
                  <Icon name="spy" color="orange" />
                </Button.Content>
              </Button>
              <Button
                floated="right"
                animated="vertical"
                onClick={this.suspendUser}
                value={user._id}
              >
                <Button.Content hidden>Suspend</Button.Content>
                <Button.Content visible>
                  <Icon name="ban" color="red" />
                </Button.Content>
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
          Manage Access
        </Header>
        <Item.Group divided>{this.renderUserSuspend()}</Item.Group>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    active: selectAllUsersActive(state)
  };
};

const mapDispatchToProps = {
  adminVerifyUser,
  adminAdminiUser
};

AdminUserSuspend = connect(mapStateToProps, mapDispatchToProps)(
  AdminUserSuspend
);

export default AdminUserSuspend;
