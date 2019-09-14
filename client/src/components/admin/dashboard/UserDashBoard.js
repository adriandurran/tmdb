import React from 'react';
import { useDispatch } from 'react-redux';
import { Card, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { fetchAllUsers } from '../../../actions/user';

const UserDashBoard = () => {
  const dispatch = useDispatch();

  dispatch(fetchAllUsers());

  return (
    <Card as={Link} to="/admin/user-tools" raised>
      <Card.Content>
        <Header as="h2">Users</Header>
      </Card.Content>
      <Card.Content description="Add & Manage & View Users" />
      <Card.Content extra />
    </Card>
  );
};

export default UserDashBoard;
