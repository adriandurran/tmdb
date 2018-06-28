import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';

import { Header, Item } from 'semantic-ui-react';

import { selectUsersInDept } from '../../../reducers/selectors/adminSelectors';

class AdminDeptHolders extends Component {
  renderDeptHolders() {
    const { users } = this.props;
    return users.map(user => {
      return (
        <Item key={user._id}>
          <Item.Image size="small" src="http://lorempixel.com/400/400/people" />
          <Item.Content>
            <Item.Header>
              {user.firstName} {user.lastName}
            </Item.Header>
            <Item.Meta>{user.username}</Item.Meta>
            <Item.Extra>
              Joined <Moment fromNow>{user.joinDate}</Moment>
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
          Users who are in this Department
        </Header>
        <Item.Group>{this.renderDeptHolders()}</Item.Group>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: selectUsersInDept(state)
  };
};

AdminDeptHolders = connect(mapStateToProps)(AdminDeptHolders);

export default AdminDeptHolders;
