import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Header, Card, Icon } from 'semantic-ui-react';

import { fetchAllUsers } from '../../../actions/user';
import {
  selectAllUsers,
  selectAllUsersVerify
} from '../../../reducers/selectors';

class AdminUserTools extends Component {
  componentDidMount() {
    const { fetchAllUsers } = this.props;
    fetchAllUsers();
  }
  render() {
    const { allusers, allusersverify } = this.props;
    return (
      <Card.Group itemsPerRow={3}>
        <Card as={Link} to="/admin/user-access-manager" raised>
          <Card.Content>
            <Header as="h5">User Access Manager</Header>
          </Card.Content>
          <Card.Content description="Manage User Access" />
          <Card.Content extra>
            {allusers.length > 0 ? (
              <span>
                <Icon name="users" />
                {allusers.length} Users loaded &nbsp;
                <Icon name="user plus" color="red" />
                {allusersverify.length} Users require verification
              </span>
            ) : (
              <span>No Users in the system</span>
            )}
          </Card.Content>
        </Card>
        <Card as={Link} to="/admin/user-role-manager" raised>
          <Card.Content>
            <Header as="h5">User Manager</Header>
          </Card.Content>
          <Card.Content description="Manager User Roles &amp; Courses" />
        </Card>
        <Card as={Link} to="/admin/user-course-manager" raised>
          <Card.Content>
            <Header as="h5">User Course Manager</Header>
          </Card.Content>
          <Card.Content description="Manager User Courses" />
        </Card>
      </Card.Group>
    );
  }
}

const mapDispatchToProps = {
  fetchAllUsers
};

const mapStateToProps = state => {
  return {
    allusers: selectAllUsers(state),
    allusersverify: selectAllUsersVerify(state)
  };
};

AdminUserTools = connect(mapStateToProps, mapDispatchToProps)(AdminUserTools);

export default AdminUserTools;
