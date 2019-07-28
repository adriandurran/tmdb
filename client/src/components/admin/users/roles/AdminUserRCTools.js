import React from 'react';

import { Grid } from 'semantic-ui-react';

import AdminUserDetailsCard from '../AdminUserDetailsCard';
import AdminUserRoleManager from './AdminUserRoleManager';
import AdminUserComps from '../comps/AdminUserComps';
import AdminUserCourseTable from '../courses/AdminUserCoursesTable';
import AdminUserAddDept from '../dept/AdminUserAddDept';
import AdminUserResetPassword from '../access/AdminUserResetPassword';

const AdminUserRCTools = () => {
  return (
    <Grid celled>
      <Grid.Row columns={3}>
        <Grid.Column>
          <AdminUserDetailsCard />
        </Grid.Column>

        <Grid.Column>
          <AdminUserAddDept />
        </Grid.Column>

        <Grid.Column>
          <AdminUserResetPassword />
        </Grid.Column>
      </Grid.Row>
      {/* roles */}
      <Grid.Row columns={2}>
        <Grid.Column>
          <AdminUserRoleManager />
        </Grid.Column>
        <Grid.Column>
          <AdminUserComps />
        </Grid.Column>
      </Grid.Row>

      {/* <Grid.Column>
          <Header as="h3" textAlign="center">
            Roles
          </Header>
          <AdminUserRoleManager />
        </Grid.Column>
        <Grid.Column>
          <Header as="h3" textAlign="center">
            Competencies
          </Header>
          <AdminUserComps />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <AdminUserCourseTable />
        </Grid.Column> */}
      {/* </Grid.Row> */}
    </Grid>
  );
};

export default AdminUserRCTools;
