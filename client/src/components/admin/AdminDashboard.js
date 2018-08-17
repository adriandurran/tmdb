import React from 'react';
import { Link } from 'react-router-dom';

import { Header, Icon, Card } from 'semantic-ui-react';

import AdminCourseTools from './courses/AdminCourseTools';
import AdminCompTools from './competencies/AdminCompTools';
import AdminRoleTools from './roles/AdminRoleTools';
import AdminApplicationTools from './apptools/AdminApplicationTools';

const AdminDashboard = (props) => {
  return (
    <div>
      <Header as="h1" textAlign="center">
        <Icon name="dashboard" />
        Admin Dashboard
      </Header>
      <Card.Group itemsPerRow={3}>
        <Card as={Link} to="/admin/department-manager" raised>
          <Card.Content>
            <Header as="h2">Departments</Header>
          </Card.Content>
          <Card.Content description="Add & Manage & View Departments" />
          <Card.Content extra>
            {/* <Icon name="factory" />
            {depts.length} &nbsp; Departments Listed */}
          </Card.Content>
        </Card>
        <Card as={Link} to="/admin/user-tools" raised>
          <Card.Content>
            <Header as="h2">Users</Header>
          </Card.Content>
          <Card.Content description="Add & Manage & View Users" />
          <Card.Content extra>
            {/* <Icon name="factory" />
            {depts.length} &nbsp; Departments Listed */}
          </Card.Content>
        </Card>
        <Card as={Link} to="/admin/role-tools" raised>
          <Card.Content>
            <Header as="h2">Roles</Header>
          </Card.Content>
          <Card.Content description="Add & Manage & View Roles" />
          <Card.Content extra>
            {/* <Icon name="factory" />
            {depts.length} &nbsp; Departments Listed */}
          </Card.Content>
        </Card>
        <Card as={Link} to="/admin/comp-tools" raised>
          <Card.Content>
            <Header as="h2">Competencies</Header>
          </Card.Content>
          <Card.Content description="Add & Manage & View Competencies" />
          <Card.Content extra>
            {/* <Icon name="factory" />
            {depts.length} &nbsp; Departments Listed */}
          </Card.Content>
        </Card>
        <Card as={Link} to="/admin/course-tools" raised>
          <Card.Content>
            <Header as="h2">Courses</Header>
          </Card.Content>
          <Card.Content description="Add & Manage & View Courses" />
          <Card.Content extra>
            {/* <Icon name="factory" />
            {depts.length} &nbsp; Departments Listed */}
          </Card.Content>
        </Card>
        <Card as={Link} to="/admin/app-tools" raised>
          <Card.Content>
            <Header as="h2">Application</Header>
          </Card.Content>
          <Card.Content description="Manage & View Application" />
          <Card.Content extra>
            {/* <Icon name="factory" />
            {depts.length} &nbsp; Departments Listed */}
          </Card.Content>
        </Card>
      </Card.Group>

      {/* <Grid>
        <Grid.Row>
          <Grid.Column>
            <Header as="h2" textAlign="center">
              Course Tools
            </Header>
            <AdminCourseTools />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Header as="h2" textAlign="center">
              Competency Tools
            </Header>
            <AdminCompTools />
          </Grid.Column>
          <Grid.Column>
            <Header as="h2" textAlign="center">
              Role Tools
            </Header>
            <AdminRoleTools />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
            <Header as="h2" textAlign="center">
              User Tools
            </Header>
            <AdminUserTools />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Header as="h2" textAlign="center">
              Application Tools
            </Header>
            <AdminApplicationTools />
          </Grid.Column>
        </Grid.Row>
      </Grid> */}
    </div>
  );
};

export default AdminDashboard;
