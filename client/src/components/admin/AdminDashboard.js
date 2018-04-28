import React from 'react';
import { Grid, Header, Icon } from 'semantic-ui-react';

import AdminCourseTools from './courses/AdminCourseTools';
import AdminCompTools from './competencies/AdminCompTools';

const AdminDashboard = props => {
  return (
    <div>
      <Header as="h1" textAlign="center">
        <Icon name="dashboard" />
        Admin Dashboard
      </Header>
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Header as="h2" textAlign="center">
              Course Tools
            </Header>
            <AdminCourseTools />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Header as="h2" textAlign="center">
              Competency Tools
            </Header>
            <AdminCompTools />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Header as="h2" textAlign="center">
              Role Tools
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Header as="h2" textAlign="center">
              User Manager Tools
            </Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default AdminDashboard;
