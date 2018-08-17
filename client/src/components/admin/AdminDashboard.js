import React from 'react';
import { Link } from 'react-router-dom';

import { Header, Icon, Card } from 'semantic-ui-react';

const AdminDashboard = (props) => {
  return (
    <div>
      <Header as="h1" textAlign="center">
        <Icon name="dashboard" />
        Admin Dashboard
      </Header>
      <Card.Group itemsPerRow={3}>
        <Card as={Link} to="/admin/department-tools" raised>
          <Card.Content>
            <Header as="h2">Departments</Header>
          </Card.Content>
          <Card.Content description="Add & Manage & View Departments" />
          <Card.Content extra />
        </Card>
        <Card as={Link} to="/admin/user-tools" raised>
          <Card.Content>
            <Header as="h2">Users</Header>
          </Card.Content>
          <Card.Content description="Add & Manage & View Users" />
          <Card.Content extra />
        </Card>
        <Card as={Link} to="/admin/role-tools" raised>
          <Card.Content>
            <Header as="h2">Roles</Header>
          </Card.Content>
          <Card.Content description="Add & Manage & View Roles" />
          <Card.Content extra />
        </Card>
        <Card as={Link} to="/admin/comp-tools" raised>
          <Card.Content>
            <Header as="h2">Competencies</Header>
          </Card.Content>
          <Card.Content description="Add & Manage & View Competencies" />
          <Card.Content extra />
        </Card>
        <Card as={Link} to="/admin/course-tools" raised>
          <Card.Content>
            <Header as="h2">Courses</Header>
          </Card.Content>
          <Card.Content description="Add & Manage & View Courses" />
          <Card.Content extra />
        </Card>
        <Card as={Link} to="/admin/app-tools" raised>
          <Card.Content>
            <Header as="h2">Application</Header>
          </Card.Content>
          <Card.Content description="Manage & View Application Settings" />
          <Card.Content extra />
        </Card>
      </Card.Group>
    </div>
  );
};

export default AdminDashboard;
