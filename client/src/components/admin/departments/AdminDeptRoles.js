import React from 'react';
import { Header, Grid, Card } from 'semantic-ui-react';

import AdminDeptRoleUsers from './AdminDeptRoleUsers';

const AdminDeptRoles = ({ roles }) => {
  return (
    <>
      {roles.map((role) => {
        return (
          <Grid.Row key={role._id}>
            <Grid.Column>
              <Header as="h5" textAlign="center">
                {role.roleName}
              </Header>
              <Card.Group itemsPerRow={3} centered>
                <AdminDeptRoleUsers roleId={role._id} />
              </Card.Group>
            </Grid.Column>
          </Grid.Row>
        );
      })}
    </>
  );
};

export default AdminDeptRoles;
