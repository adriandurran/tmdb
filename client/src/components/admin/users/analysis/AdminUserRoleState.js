import React from 'react';
import { Header, Card } from 'semantic-ui-react';
import AdminUserRoleStateCard from './AdminUserRoleStateCard';

const AdminUserRoleState = ({ user }) => {
  return (
    <>
      <Header as="h3" textAlign="center">
        Role Analysis
      </Header>
      <Card.Group centered itemsPerRow={2}>
        {user.roles.map((role) => (
          <AdminUserRoleStateCard role={role} user={user} key={role._id} />
        ))}
      </Card.Group>
    </>
  );
};

export default AdminUserRoleState;
