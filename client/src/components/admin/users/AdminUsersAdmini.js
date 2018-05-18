import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Item, Button, Header, Icon } from 'semantic-ui-react';

import { selectAllUsersAdmins } from '../../../reducers/selectors';
import { adminAdminiUser } from '../../../actions/user';

class AdminUsersAdmini extends Component {
  adminiUser = (e, { value }) => {
    this.props.adminAdminiUser(value, false);
  };

  renderUserAdmins() {
    const { admins } = this.props;
    return admins.map(user => {
      return (
        <Item key={user._id}>
          <Item.Content verticalAlign="middle">
            <Item.Header>
              {user.firstName} {user.lastName}
            </Item.Header>
            <Item.Meta>{user.userId}</Item.Meta>
            <Item.Description>{user.username}</Item.Description>
            <Item.Extra>
              <Button
                floated="right"
                animated="vertical"
                onClick={this.adminiUser}
                value={user._id}
              >
                <Button.Content hidden>Demote</Button.Content>
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
          Admin Users
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
  adminAdminiUser
};

AdminUsersAdmini = connect(mapStateToProps, mapDispatchToProps)(
  AdminUsersAdmini
);

export default AdminUsersAdmini;
