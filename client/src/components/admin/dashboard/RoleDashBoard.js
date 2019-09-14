import React from 'react';
import { useDispatch } from 'react-redux';
import { Card, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { fetchRoles } from '../../../actions/roles';

const RoleDashBoard = () => {
  const dispatch = useDispatch();

  dispatch(fetchRoles());

  return (
    <Card as={Link} to="/admin/role-tools" raised>
      <Card.Content>
        <Header as="h2">Roles</Header>
      </Card.Content>
      <Card.Content description="Add & Manage & View Roles" />
      <Card.Content extra />
    </Card>
  );
};

export default RoleDashBoard;
