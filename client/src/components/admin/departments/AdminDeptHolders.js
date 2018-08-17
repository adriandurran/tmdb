import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';

import { Header, Item } from 'semantic-ui-react';

import { selectUsersInDept } from '../../../reducers/selectors/adminSelectors';
import { fetchAllUsers } from '../../../actions/user';

class AdminDeptHolders extends Component {
  componentDidMount() {
    this.props.fetchAllUsers();
  }

  renderDeptHolders() {
    const { users } = this.props;
    return users.map((user) => {
      return (
        <Item key={user._id}>
          <Item.Image size="tiny" circular src={user.imageUrl} />
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

const mapStateToProps = (state) => {
  return {
    users: selectUsersInDept(state)
  };
};

const mapDispatchToProps = {
  fetchAllUsers
};

AdminDeptHolders = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminDeptHolders);

export default AdminDeptHolders;
