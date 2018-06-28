import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Header, Card, Icon } from 'semantic-ui-react';

import { fetchAllUsers } from '../../../actions/user';
import { fetchDepts } from '../../../actions/dept';

import {
  selectAllUsers,
  selectAllUsersCoursesVerify,
  selectAllUsersVerify
} from '../../../reducers/selectors/adminSelectors';
import { selectDepts } from '../../../reducers/selectors/deptSelectors';

class AdminUserTools extends Component {
  componentDidMount() {
    const { fetchAllUsers } = this.props;
    fetchAllUsers();
    fetchDepts();
  }
  render() {
    const { allusers, allusersverify, allcoursesverify, depts } = this.props;
    return (
      <Card.Group itemsPerRow={4}>
        <Card as={Link} to="/admin/user-access-manager" raised>
          <Card.Content>
            <Header as="h5">User Access Manager</Header>
          </Card.Content>
          <Card.Content description="Manage User Access" />
          <Card.Content extra>
            {allusers.length > 0 ? (
              <span>
                <Icon name="users" />
                {allusers.length} Users loaded &nbsp;<br />
                <Icon name="user plus" color="red" />
                {allusersverify.length} Users require verification
              </span>
            ) : (
              <span>No Users in the system</span>
            )}
          </Card.Content>
        </Card>
        <Card as={Link} to="/admin/user-manager" raised>
          <Card.Content>
            <Header as="h5">User Manager</Header>
          </Card.Content>
          <Card.Content description="Manager User Roles &amp; Courses" />
        </Card>
        <Card as={Link} to="/admin/user-courses-manager" raised>
          <Card.Content>
            <Header as="h5">User Courses Manager</Header>
          </Card.Content>
          <Card.Content description="Verify User Courses" />
          <Card.Content extra>
            {allcoursesverify.length > 0 ? (
              <span>
                <Icon name="users" color="red" />
                {allcoursesverify.length} &nbsp; User Courses waiting for
                verification
              </span>
            ) : (
              <span>No Courses need verification</span>
            )}
          </Card.Content>
        </Card>
        <Card as={Link} to="/admin/department-manager" raised>
          <Card.Content>
            <Header as="h5">Department Manager</Header>
          </Card.Content>
          <Card.Content description="Add & Manage Departments" />
          <Card.Content extra>
            <Icon name="factory" />
            {depts.length} &nbsp; Departments Listed
          </Card.Content>
        </Card>
      </Card.Group>
    );
  }
}

const mapDispatchToProps = {
  fetchAllUsers,
  fetchDepts
};

const mapStateToProps = state => {
  return {
    allusers: selectAllUsers(state),
    allusersverify: selectAllUsersVerify(state),
    allcoursesverify: selectAllUsersCoursesVerify(state),
    depts: selectDepts(state)
  };
};

AdminUserTools = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminUserTools);

export default AdminUserTools;
