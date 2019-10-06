import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Header, Card, Icon } from 'semantic-ui-react';

import { fetchAllUsers } from '../../../actions/user';

import {
  selectAllUsers,
  selectAllUsersCoursesVerify,
  selectAllUsersVerify
} from '../../../reducers/selectors/adminSelectors';

const AdminUserTools = () => {
  const dispatch = useDispatch();
  const allusers = useSelector(selectAllUsers);
  const allusersverify = useSelector(selectAllUsersVerify);
  const allcoursesverify = useSelector(selectAllUsersCoursesVerify);

  dispatch(fetchAllUsers());

  return (
    <>
      <Header as="h2" textAlign="center">
        Users
      </Header>
      <Card.Group itemsPerRow={3} style={{ marginTop: '2em' }}>
        {/* <Card as={Link} to="/admin/user-access-manager" raised>
          <Card.Content>
            <Header as="h5">User Access Manager</Header>
          </Card.Content>
          <Card.Content description="Manage User Access" />
          <Card.Content extra>
            {allusers.length > 0 ? (
              <span>
                <Icon name="users" />
                {allusers.length} Users loaded &nbsp;
                <br />
                <Icon name="user plus" color="red" />
                {allusersverify.length} Users require verification
              </span>
            ) : (
              <span>No Users in the system</span>
            )}
          </Card.Content>
        </Card> */}
        <Card as={Link} to="/admin/user-manager" raised>
          <Card.Content>
            <Header as="h5">User Manager</Header>
          </Card.Content>
          <Card.Content description="User Manager" />
          <Card.Content extra>
            {allusers.length > 0 ? (
              <span>
                <Icon name="users" />
                {allusers.length} Users loaded &nbsp;
              </span>
            ) : (
              <span>No Users in the system</span>
            )}
          </Card.Content>
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
        <Card as={Link} to="/admin/user-views" raised>
          <Card.Content>
            <Header as="h5">All User View</Header>
          </Card.Content>
          <Card.Content description="View all Users in a table" />
          <Card.Content extra>
            {allusers.length > 0 ? (
              <span>
                <Icon name="users" />
                {allusers.length} Users loaded &nbsp;
                <br />
                <Icon name="user plus" color="red" />
                {allusersverify.length} Users require verification
              </span>
            ) : (
              <span>No Users in the system</span>
            )}
          </Card.Content>
        </Card>
      </Card.Group>
    </>
  );
};

export default AdminUserTools;
