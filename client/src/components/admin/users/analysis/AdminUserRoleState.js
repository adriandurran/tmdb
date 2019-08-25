import React from 'react';
import { Header, Card } from 'semantic-ui-react';
import AdminUserRoleStateCard from './AdminUserRoleStateCard';
import { isEmpty } from 'lodash';

const AdminUserRoleState = ({ user }) => {
  return (
    <>
      <Header as="h3" textAlign="center">
        Role Analysis
      </Header>
      <Card.Group centered itemsPerRow={2}>
        {user.roles.map((role, i) => {
          if (isEmpty(role._role)) {
            return <div key={i} />;
          }
          return (
            <AdminUserRoleStateCard role={role} user={user} key={role._id} />
          );
        })}
      </Card.Group>
    </>
  );
};

export default AdminUserRoleState;
