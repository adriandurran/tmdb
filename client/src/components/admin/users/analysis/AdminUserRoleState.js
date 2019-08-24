import React from 'react';
import { Header } from 'semantic-ui-react';
import AdminUserRoleStateCard from './AdminUserRoleStateCard';

const AdminUserRoleState = ({ user }) => {
  return (
    <>
      <Header as="h3" textAlign="center">
        Role Analysis
      </Header>
      {user.roles.map((role) => (
        <AdminUserRoleStateCard role={role} user={user} key={role._id} />
      ))}
    </>
  );
};

export default AdminUserRoleState;
