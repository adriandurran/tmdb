import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Header, Card, Icon } from 'semantic-ui-react';

import { fetchAllUsers } from '../../../actions/user';

import {
  selectAllUsers,
  selectAllUsersVerify
} from '../../../reducers/selectors/adminSelectors';

const AdminApplicationTools = () => {
  const dispatch = useDispatch();
  const allusers = useSelector(selectAllUsers);
  const allusersverify = useSelector(selectAllUsersVerify);

  dispatch(fetchAllUsers());

  return (
    <>
      <Header as="h2" textAlign="center">
        Application Tools
      </Header>

      <Card.Group itemsPerRow={2} style={{ marginTop: '2em' }}>
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
                <br />
                <Icon name="user plus" color="red" />
                {allusersverify.length} Users require verification
              </span>
            ) : (
              <span>No Users in the system</span>
            )}
          </Card.Content>
        </Card>
        <Card raised as={Link} to="/application/version">
          <Card.Content>
            <Header as="h5">Version Manager</Header>
          </Card.Content>
          <Card.Content description="Manage application versions" />
        </Card>
      </Card.Group>
    </>
  );
};

export default AdminApplicationTools;
