import React from 'react';
import { Card, Image } from 'semantic-ui-react';

const AdminDeptManagers = ({ dept }) => {
  return (
    <Card.Group itemsPerRow={3} centered>
      {dept.managers.map((manager) => {
        return (
          <Card key={manager._id}>
            <Image src={manager.imageUrl} wrapped ui={false} />
            <Card.Content>
              <Card.Header>
                {manager.firstName} {manager.lastName}
              </Card.Header>
            </Card.Content>
          </Card>
        );
      })}
    </Card.Group>
  );
};

export default AdminDeptManagers;
